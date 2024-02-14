import React, { useEffect, useState } from "react";
import "./card.css";
import { formatDistanceToNow } from "date-fns";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { Dropdown } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { BASE_API } from "../../config";

const formatTimeElapsed = (postedAt) => {
  const postedDate = new Date(postedAt);
  const timeElapsed = formatDistanceToNow(postedDate, { addSuffix: true });
  return timeElapsed.replace(/^about\s/i, "");
};

//main function
const Card = (props) => {
  const timeElapsed = formatTimeElapsed(props.propsData.postedAt);

  const user = useSelector((state) => state.UserReducer);

  const handleDelete = async (postId) => {
    await props.onDeletePost(postId);
  };

  const [comment, setComment] = useState(false);
  const [commentBody, setCommentBody] = useState("");
  const [allComments, setAllComments] = useState([]);

  //like functionality
  const likePost = async (postId) => {
    const resultString = localStorage.getItem("Profile");
    const result = JSON.parse(resultString);
    const token = result.token;

    const request = { postid: postId };

    try {
      const resp = await axios.put(`${BASE_API}/like`, request, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (resp.status === 200) {
        props.getAllPosts();
      } else {
        toast.error(resp.data.error);
      }
    } catch (err) {
      toast.error(err.data.error);
      console.error(err);
    }
  };

  //unlike functionality
  const unLikePost = async (postId) => {
    const resultString = localStorage.getItem("Profile");
    const result = JSON.parse(resultString);
    const token = result.token;

    const request = { postid: postId };

    try {
      const resp = await axios.put(`${BASE_API}/unlike`, request, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (resp.status === 200) {
        props.getAllPosts();
      } else {
        toast.error(resp.data.error);
      }
    } catch (err) {
      toast.error(err.data.error);
      console.error(err);
    }
  };

  // console.log(props.propsData._id)

  //Like and unlike
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    // Load the initial like/unlike state from the server when the component mounts
    const fetchLikeState = async () => {
      try {
        const resp = await axios.get(
          `${BASE_API}/likenunlike/${props.propsData._id}/like-state`
        );
        setIsLiked(resp.data.isLiked);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLikeState(); // Fetch initial like state
  }, [props.propsData._id]);

  const likeAndUnlike = async () => {
    try {
      const resp = await axios.get(
        `${BASE_API}/likenunlike/${props.propsData._id}/like-state`
      );
      const isAlreadyLiked = resp.data.isLiked;

      if (!isAlreadyLiked) {
        await likePost(props.propsData._id);
        setIsLiked(true);
      } else {
        await unLikePost(props.propsData._id);
        setIsLiked(false);
      }

      props.getAllPosts();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setAllComments(props.propsData.comments);
  }, [props.propsData.comments]);

  const commentByUsers = async (postId) => {
    const resultString = localStorage.getItem("Profile");
    const result = JSON.parse(resultString);
    const token = result.token;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const resp = await axios.put(
        `${BASE_API}/comment`,
        { postId, commentText: commentBody },
        config
      );
      if (resp.status === 200) {
        setCommentBody("");
        setAllComments(resp.data.user.comments);
        props.getAllPosts();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const commentBox = () => {
    if (!comment) {
      setComment(true);
    } else {
      setComment(false);
    }
  };
  const allCommentsMadeTillNow = props.propsData.comments;
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
                      <Dropdown.Item
                        onClick={() => handleDelete(props.propsData._id)}
                      >
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
            <div className="col-5 post-icons px-4">
              {isLiked ? (
                <i
                  className="fa-solid fa-heart fa-lg"
                  style={{ color: "#cc0000" }}
                  onClick={likeAndUnlike}
                ></i>
              ) : (
                <i
                  className="fa-regular fa-heart fa-lg"
                  style={{ color: "#000000" }}
                  onClick={likeAndUnlike}
                ></i>
              )}
              <i
                className="fa-regular fa-comment fa-lg"
                style={{ color: "#000000" }}
                onClick={() => commentBox()}
              ></i>

              <i
                className="fa-regular fa-paper-plane fa-lg"
                style={{ color: "#000000" }}
              ></i>
            </div>
            <div className="col-7 px-4 d-flex justify-content-end gap-3">
              <h6 style={{ margin: "0px", textAlign: "end" }}>
                {props.propsData.likes.length} Likes
              </h6>
              <h6 style={{ margin: "0px", textAlign: "end" }}>
                {allCommentsMadeTillNow.length > 0 && (
                  <div className="comments-section">
                    {allCommentsMadeTillNow.length} Comments
                  </div>
                )}{" "}
              </h6>
            </div>
          </div>
          <div className="card-foot-timeline text-muted px-2">
            <p style={{ margin: "0px", fontSize: "13px" }}>{timeElapsed}</p>
          </div>

          {comment ? (
            <>
              
              <div className="row px-2 d-flex align-items-center">
                <p className="mt-2 text-body-secondary">Comments</p>
                <div className="col col-9">
                  <textarea
                    className="form-control border-0 border-bottom rounded-0 textarea"
                    id="exampleFormControlTextarea1"
                    placeholder="Comment"
                    rows="1"
                    style={{
                      resize: "none",
                      fontSize: "14px",
                      padding: "6px",
                      maxHeight: "70px",
                    }}
                    value={commentBody}
                    onChange={(e) => setCommentBody(e.target.value)}
                  ></textarea>
                </div>
                <div className="col col-3 d-flex justify-content-end">
                  <button
                    className="btn btn-primary"
                    onClick={() => commentByUsers(props.propsData._id)}
                  >
                    Post
                  </button>
                </div>
              </div>
              {allCommentsMadeTillNow.length > 0 && (
                <div className="comments-section">
                  {allCommentsMadeTillNow.map((comment, index) => (
                    <div key={index} className="d-flex flex-row card mx-2 my-2 p-2">
                      <div className="left profile-pic-con"><img className="profile-pic" src={comment.commentedBy.profileImg} alt="" /></div>
                      <div className="comment px-2 d-flex flex-column justify-content-center gap-1">
                        <h6 className="m-0">{comment.commentedBy.fullname}</h6>
                        <p className="m-0 text-black-50">{comment.commentText}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <> </>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Card;
