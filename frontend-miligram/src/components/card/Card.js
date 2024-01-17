import React from "react";
import "./card.css";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Card = () => {
  return (
    <div>
      <div className="card shadow-sm">
        <div className="card-body p-2">
          <div className="row">
            <div className="col-6 d-flex align-items-center">
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
            <div className="col-6 d-flex align-items-center justify-content-end">
              <span className="px-2">
                <FontAwesomeIcon icon={faEllipsisVertical} size="xl" />
              </span>
            </div>
          </div>
          <div className="card-img p-2">
            <img
              alt="post"
              className="img-fluid post-img rounded"
              src="https://images.unsplash.com/photo-1484627147104-f5197bcd6651?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          </div>
          <div className="row py-2">
            <div className="col-8 post-icons px-4">
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
            <div className="col-4 px-4">
              <h6 style={{ margin: "0px", textAlign: "end" }}>121 Likes</h6>
            </div>
          </div>
        <div className="card-foot-timeline text-muted px-2">
          <p style={{margin: '0px', fontSize:'13px'}}>2h ago</p>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
