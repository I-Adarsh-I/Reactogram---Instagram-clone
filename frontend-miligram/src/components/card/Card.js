import React, { useEffect } from "react";
import "./card.css";
import { formatDistanceToNow } from "date-fns";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { Dropdown } from "react-bootstrap";
import {
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { BASE_API } from "../../config";

const formatTimeElapsed = (postedAt) => {
  const postedDate = new Date(postedAt);
  const timeElapsed = formatDistanceToNow(postedDate, { addSuffix: true });
  return timeElapsed.replace(/^about\s/i, "");
};
const Card = (props) => {
  const timeElapsed = formatTimeElapsed(props.propsData.postedAt);

  const user = useSelector((state) => state.UserReducer);

  const handleDelete = async(postId) => {
    await props.onDeletePost(postId)
  }
  
  const likePost = async(postId) => {
    const resultString = localStorage.getItem('Profile')
    const result = JSON.parse(resultString);
    const token = result.token

    const request = {"postid": postId}

    try {
      const resp = await axios.put(`${BASE_API}/like`, request, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      console.log("User: ",resp);
      if(resp.status === 200){
        props.getAllPosts();
        console.log('User liked your post')
      }else{
        console.log(resp.data.error)
      }
      // console.log("id's are", postId, userId);
    } catch (err) {
      console.error(err);
    }
  }
  console.log(props.propsData._id)

  return (
    <div className="d-flex justify-content-center">
      <div className="card shadow-sm per-card">
        <div className="card-body p-2">
          <div className="row">
            <div className="col-6 d-flex align-items-center">
              <div className="profile-pic-con p-1">
                <img
                  className="profile-pic"
                  alt="Profile pic"
                  src={props.propsData.author.profileImg}
                />
              </div>
              <div className="profile-info">
                <h6 className="profile-name">
                  {" "}
                  {props.propsData.author.fullname}
                </h6>
                <p className="profile-description text-muted">
                  {props.propsData.location}
                </p>
              </div>
            </div>
            <div className="col-6 d-flex align-items-center justify-content-end">
              {props.propsData.author._id === user.user._id ? (
                <>
                  <Dropdown>
                    <Dropdown.Toggle
                      className="profile-dropdown"
                      id="dropdown-basic"
                    >
                      <FontAwesomeIcon
                        icon={faEllipsisVertical}
                        size="xl"
                        className="px-2"
                      />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item href="/profile">
                        <FontAwesomeIcon
                          icon={faPenToSquare}
                          className="text-black-50"
                        />{" "}
                        Edit Post
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleDelete(props.propsData._id)}>
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="text-black-50"
                        />
                        Delete Post
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="card-img p-2">
            <img
              alt="post"
              className="img-fluid post-img rounded"
              src={props.propsData.image}
            />
            <div className="h5 mt-3">{props.propsData.description}</div>
          </div>
          <div className="row py-2">
            <div className="col-8 post-icons px-4" >
              <i
                className="fa-regular fa-heart fa-lg"
                style={{ color: "#000000" }}
                onClick={() => likePost(props.propsData._id)}
              ></i>
              <i
                className="fa-regular fa-comment fa-lg"
                style={{ color: "#000000" }}
              ></i>
              <i
                className="fa-regular fa-paper-plane fa-lg"
                style={{ color: "#000000" }}
              ></i>
            </div>
            <div className="col-4 px-4">
              <h6 style={{ margin: "0px", textAlign: "end" }}>
                {props.propsData.likes.length} Likes
              </h6>
            </div>
          </div>
          <div className="card-foot-timeline text-muted px-2">
            <p style={{ margin: "0px", fontSize: "13px" }}>{timeElapsed}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
