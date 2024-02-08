import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./profilepage.css";
import { Modal, OverlayTrigger, Popover } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import {
  faCloudArrowUp,
  faEllipsis,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BASE_API } from "../../config";
import { useSelector } from "react-redux";
import { Dropdown } from "react-bootstrap";

function ProfilePage() {
  const [show, setShow] = useState(false);
  const [showPostUp, setShowPostUp] = useState(false);
  const [image, setImage] = useState({ preview: "", data: "" });
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [post, setPost] = useState([]);
  const [postDetail, setPostDetail] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClosePostUp = () => setShowPostUp(false);
  const handleShowPostUp = () => setShowPostUp(true);

  const navigate = useNavigate();

  const user = useSelector((state) => state.UserReducer);

  //File select function
  const handleFileSelect = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImage(img);
    console.log(img);
  };
  // File upload function
  const handleFileUpload = async () => {
    try {
      let formData = new FormData();
      formData.append("file", image.data);

      const resp = await axios.post(`${BASE_API}/upload`, formData);
      // toast.success("Post created successfully");
      return resp;
    } catch (err) {
      console.error("Error uploading file: ", err);
      throw err; // Rethrow the error for the caller to handle
    }
  };

  // Show details of user in image pop up
  const showImgDetails = (post) => {
    handleShow();
    setPostDetail(post);
  };

  // Create new post
  const addPost = async () => {
    const imgRes = await handleFileUpload();

    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)User\s*token\s*=\s*([^;]*).*$)/,
      "$1"
    );

    if (!token) {
      console.error("Token not found in cookies");
      return;
    }

    if (image.preview === "") {
      toast.warn("Cannot create a post without image");
      return;
    } else if (caption === "") {
      toast.warn("Cannot create a post without caption");
      return;
    } else if (location === "") {
      toast.warn("Cannot create a post without location");
      return;
    }

    const request = {
      description: caption,
      location: location,
      image: `${BASE_API}/files/${imgRes.data.filename}`,
    };

    const resp = await axios.post(`${BASE_API}/createpost`, request, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (resp.status === 201) {
      toast.success(resp.data.message);
      navigate("/posts");
    } else {
      toast.error("Failed to create post");
    }

    console.log(resp);
  };

  //Delete Post
  const handleDeletePost = async (postId) => {
    const resultString = localStorage.getItem('Profile')
    const result = JSON.parse(resultString);
    const token = result.token

    try {
      const resp = await axios.delete(`${BASE_API}/deletepost/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      handleClose()
      myGalleryPosts();
    } catch (err) {
      console.error(err);
    }
  };

  axios.defaults.withCredentials = true;

  const fetchData = async () => {
    try {
      const resp = await axios.get(`${BASE_API}/profile`);
      if (resp.status !== 200) {
        navigate("/");
      } else if (resp.status === 400) {
        navigate("/");
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        toast.error(err.response.data.error);
        navigate("/");
      } else {
        console.error("Error occurred:", err);
      }
    }
  };

  const myGalleryPosts = async () => {
    try {
      const resp = await axios.get(`${BASE_API}/mygallery`);
      if (resp.status === 200) {
        setPost(resp.data.posts);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
    myGalleryPosts();
  }, []);

  return (
    <div className="container main-profile-page card mt-3">
      <div className="profilePage-main-con-top container">
        <div className="row">
          <div className="pp-t-l-con col-md-6 text-left">
            <div className="person-profile-img-info-con">
              <div className="profile-pic-con-pp p-1">
                <img
                  className="profile-pic"
                  alt="Profile pic"
                  src={user.user.profileImg}
                />
              </div>
              <div className="name-con">
                <h3>{user.user.fullname}</h3>
                <h5>@Username</h5>
              </div>
            </div>
            <div className="bio-con">Lorem ipsum dolor sit amet.</div>
          </div>
          <div className="pp-t-r-con col-md-6 text-end">
            <div className="list-con">
              <div className="list-con-i">
                <h3>{post.length}</h3>
                <h6>posts</h6>
              </div>
              <div className="seperator"></div>
              <div className="list-con-i">
                <h3>83</h3>
                <h6>Followers</h6>
              </div>
              <div className="seperator"></div>
              <div className="list-con-i">
                <h3>83</h3>
                <h6>Following</h6>
              </div>
            </div>
            <div className="options-con ">
              <button className="btn btn-outline-secondary shadow-sm opt-btn">
                Edit profile
              </button>
              <button
                className="btn btn-outline-secondary shadow-sm opt-btn"
                shadow-sm
                onClick={handleShowPostUp}
              >
                Upload post
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container my-3">
        <hr />
      </div>
      <div className="profile-gallery row g-4 mb-3">
        {post.map((post, index) => {
          return (
            <div
              className="col-md-4 col-sm-12 d-flex align-items-center justify-content-center"
              key={index}
            >
              <div
                className="card"
                onClick={() => showImgDetails(post)}
                style={{ cursor: "pointer" }}
              >
                <img
                  className="gallery-pic w-100 rounded"
                  alt="Profile pic"
                  src={post.image}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* POP UP */}
      <Modal
        show={show}
        onHide={handleClose}
        className="modal"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {/* Modal header section */}
        <div className="upper-layer d-flex justify-content-end align-items-center">
          <div className="col-6 d-flex align-items-center justify-content-end">
            <Dropdown>
              <Dropdown.Toggle className="profile-dropdown" id="dropdown-basic">
                <span className="px-2 text-black-50">
                  <FontAwesomeIcon icon={faEllipsis} size="lg" role="button" />
                </span>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="/profile">
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    className="text-black-50"
                  />{" "}
                  Edit Post
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleDeletePost(postDetail._id)}>
                  <FontAwesomeIcon icon={faTrash} className="text-black-50"/>
                  Delete Post
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <Modal.Header closeButton></Modal.Header>
        </div>
        <div className="container row mb-2">
          <div className="col-md-6 d-flex justify-content-center flex-column">
            {/*  */}
            <div className="col-6 d-flex align-items-center d-md-none mb-2 ">
              <div className="profile-pic-con p-1 ">
                <img
                  className="profile-pic"
                  alt="Profile pic"
                  src={
                    postDetail.author
                      ? postDetail.author.profileImg
                      : user.user.profileImg
                  }
                />
              </div>
              <div className="profile-info">
                <h6 className="profile-name"> Adarsh</h6>
                <p className="profile-description text-muted">Location</p>
              </div>
            </div>
            {/*  */}
            <div
              id="carouselExampleControlsNoTouching"
              className="carousel slide"
              data-bs-touch="false"
            >
              <div className="carousel-inner mb-3 rounded">
                <div className="carousel-item active">
                  <img
                    src={postDetail.image}
                    className="d-block w-100"
                    alt="Scenery"
                  />
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleControlsNoTouching"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleControlsNoTouching"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
          {/* Right section */}
          <div className="col-md-6">
            <div className="row">
              <div className="col-6 d-none d-md-flex align-items-center d-none d-sm-flex">
                <div className="profile-pic-con p-1">
                  <img
                    className="profile-pic"
                    alt="Profile pic"
                    src={
                      postDetail.author
                        ? postDetail.author.profileImg
                        : user.user.profileImg
                    }
                  />
                </div>
                <div className="profile-info">
                  <h6 className="profile-name">
                    {postDetail.author
                      ? postDetail.author.fullname
                      : "Loading..."}
                  </h6>
                  <p className="profile-description text-muted">
                    {postDetail.location}
                  </p>
                </div>
              </div>
            </div>
            <div className="card-img p-2">
              <div className="card-foot-timeline text-muted mb-1">
                <p style={{ margin: "0px", fontSize: "13px" }}>2h ago</p>
              </div>
              <p className="mb-1">{postDetail.description}</p>
            </div>
            <div className="py-2 d-flex flex-column">
              <div className="post-icons px-1 pb-3">
                <i
                  className="fa-regular fa-heart fa-lg"
                  style={{ color: "#000000" }}
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
              <div className="px-1">
                <h6 style={{ margin: "0px" }}>
                  {postDetail.likes ? postDetail.likes.length : "0-"} Likes
                </h6>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* POP UP POST UPLOAD*/}
      <Modal
        show={showPostUp}
        onHide={handleClosePostUp}
        className="modal"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {/* Modal header section */}
        <div className="upper-layer d-flex justify-content-between align-items-center px-4 my-2">
          <div className="col-6 d-flex align-items-center justify-content-start">
            <span className="w-100 fw-bold">Upload Post</span>
          </div>
          <Modal.Header className="header-postup" closeButton></Modal.Header>
        </div>
        <div className="container row mb-3">
          {/* Left Section */}
          <div
            className="col-md-6 d-flex flex-column justify-content-center align-items-center"
            role="button"
          >
            {image.preview ? (
              <>
                <div className="uploaded-img-container">
                  <img src={image.preview} className="user-uploaded-img" />
                </div>
              </>
            ) : (
              <>
                <div className="upload-post-box">
                  <div className="formbold-mb-5 formbold-file-input">
                    <input
                      type="file"
                      name="file"
                      id="file"
                      accept=".jpg, .png, .jpeg"
                      onChange={handleFileSelect}
                    />
                    <label for="file">
                      <div className="">
                        <FontAwesomeIcon
                          icon={faCloudArrowUp}
                          className="mb-2"
                          style={{
                            color: "lightgray",
                            height: "50px",
                            width: "50px",
                          }}
                        />
                        <div className="upload-post-text w-100">
                          <p className="m-0 text-nowrap">
                            <a className="upload-post-text link-offset-2 link-underline text-decoration-none ">
                              Upload media from device
                            </a>
                          </p>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </>
            )}
          </div>
          {/* Right section */}
          <div className="col-md-6">
            <form className="mb-5">
              <div className="mb-3">
                <textarea
                  placeholder="Add caption"
                  className="form-control upload-media"
                  id="exampleFormControlTextarea1"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  rows="3"
                ></textarea>
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="form-control upload-media"
                />
              </div>
            </form>
            <div className="post-btn d-flex justify-content-end">
              <button className="btn btn-primary" onClick={addPost}>
                Post
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <ToastContainer autoClose={5000} />
    </div>
  );
}

export default ProfilePage;
