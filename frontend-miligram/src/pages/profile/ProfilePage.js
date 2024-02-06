import React, { useState } from "react";
import "./profilepage.css";
import { Button, Modal, OverlayTrigger, Popover } from "react-bootstrap";
import {
  faCloudArrowUp,
  faEllipsis,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ProfilePage() {
  const [show, setShow] = useState(false);
  const [showPostUp, setShowPostUp] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClosePostUp = () => setShowPostUp(false);
  const handleShowPostUp = () => setShowPostUp(true);

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
                  src="https://images.unsplash.com/photo-1576526625665-849fbc418224?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
              </div>
              <div className="name-con">
                <h3>Full name</h3>
                <h5>@Username</h5>
              </div>
            </div>
            <div className="bio-con">Lorem ipsum dolor sit amet.</div>
          </div>
          <div className="pp-t-r-con col-md-6 text-end">
            <div className="list-con">
              <div className="list-con-i">
                <h3>83</h3>
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
        <div className="col-md-4 col-sm-12">
          <div
            className="card"
            onClick={handleShow}
            style={{ cursor: "pointer" }}
          >
            <img
              className="gallery-pic w-100 rounded"
              alt="Profile pic"
              src="https://images.unsplash.com/photo-1494783367193-149034c05e8f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          </div>
        </div>
        <div className="col-md-4 col-sm-12 col-lg-4">
          <div className="card">
            <img
              className="gallery-pic w-100 rounded"
              alt="Profile pic"
              src="https://images.unsplash.com/reserve/bOvf94dPRxWu0u3QsPjF_tree.jpg?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          </div>
        </div>
        <div className="col-md-4 col-sm-12">
          <div className="card">
            <img
              className="gallery-pic w-100 rounded"
              alt="Profile pic"
              src="https://images.unsplash.com/photo-1494783367193-149034c05e8f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          </div>
        </div>
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
            <OverlayTrigger
              trigger="click"
              placement="bottom"
              overlay={
                <Popover id={`popover-positioned-bottom`}>
                  <Popover.Body>
                    <div
                      className="d-flex align-items-center justify-content-around cursor-pointer"
                      role="button"
                    >
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        className="text-black-50"
                      />
                      <div style={{ width: "70px" }}>Edit Post</div>
                    </div>
                    <div
                      className="d-flex align-items-center justify-content-around cursor-pointer"
                      role="button"
                    >
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="text-black-50"
                      />
                      <div style={{ width: "70px" }}>Delete Post</div>
                    </div>
                  </Popover.Body>
                </Popover>
              }
            >
              <span className="px-2 text-black-50">
                <FontAwesomeIcon icon={faEllipsis} size="lg" role="button" />
              </span>
            </OverlayTrigger>
          </div>
          <Modal.Header closeButton></Modal.Header>
        </div>
        <div className="container row mb-2">
          <div className="col-md-6">
            {/*  */}
            <div className="col-6 d-flex align-items-center d-md-none mb-2 ">
              <div className="profile-pic-con p-1 ">
                <img
                  className="profile-pic"
                  alt="Profile pic"
                  src="https://images.unsplash.com/photo-1576526625665-849fbc418224?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
                    src="https://images.unsplash.com/reserve/bOvf94dPRxWu0u3QsPjF_tree.jpg?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className="d-block w-100"
                    alt="Scenery"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="https://images.unsplash.com/reserve/bOvf94dPRxWu0u3QsPjF_tree.jpg?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className="d-block w-100"
                    alt="Scenery"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="https://images.unsplash.com/reserve/bOvf94dPRxWu0u3QsPjF_tree.jpg?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
                    src="https://images.unsplash.com/photo-1576526625665-849fbc418224?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  />
                </div>
                <div className="profile-info">
                  <h6 className="profile-name"> Adarsh</h6>
                  <p className="profile-description text-muted">Location</p>
                </div>
              </div>
            </div>
            <div className="card-img p-2">
              <div className="card-foot-timeline text-muted mb-1">
                <p style={{ margin: "0px", fontSize: "13px" }}>2h ago</p>
              </div>
              <p className="mb-1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Temporibus, ad quae praesentium mollitia tempore cumque
                necessitatibus cum sapiente neque laborum.
              </p>
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
                <h6 style={{ margin: "0px" }}>121 Likes</h6>
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
            className="col-md-6 upload-post-box d-flex flex-column justify-content-center align-items-center"
            role="button"
          >
            <div className="formbold-mb-5 formbold-file-input">
              <input type="file" name="file" id="file" />
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
          {/* Right section */}
          <div className="col-md-6">
            <form className="mb-5">
              <div className="mb-3">
                <textarea
                  placeholder="Add caption"
                  className="form-control upload-media"
                  id="exampleFormControlTextarea1"
                  rows="3"
                ></textarea>
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Location"
                  className="form-control upload-media"
                />
              </div>
            </form>
            <div className="post-btn d-flex justify-content-end">
              <button className="btn btn-primary">Post</button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ProfilePage;
