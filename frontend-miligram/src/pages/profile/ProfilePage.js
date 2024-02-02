import React, { useState } from "react";
import "./profilepage.css";
import { Button, Modal } from "react-bootstrap";

function ProfilePage() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
      <div className="profile-gallery row g-4">
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

      <Modal show={show} onHide={handleClose} className="modal" size="lg">
        <Modal.Header closeButton></Modal.Header>
        <div className="container row">
          <div className="col-md-6">
            <div
              id="carouselExampleControlsNoTouching"
              className="carousel slide"
              data-bs-touch="false"
            >
              <div className="carousel-inner mb-3 rounded">
                <div className="carousel-item active">
                  <img src="https://images.unsplash.com/reserve/bOvf94dPRxWu0u3QsPjF_tree.jpg?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                  <img src="https://images.unsplash.com/reserve/bOvf94dPRxWu0u3QsPjF_tree.jpg?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                  <img src="https://images.unsplash.com/reserve/bOvf94dPRxWu0u3QsPjF_tree.jpg?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="d-block w-100" alt="..." />
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
          <div className="col-md-6">Right container</div>
        </div>
      </Modal>
    </div>
  );
}

export default ProfilePage;