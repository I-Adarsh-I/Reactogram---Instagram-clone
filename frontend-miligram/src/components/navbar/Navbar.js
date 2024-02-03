import React from "react";
import "./navbar.css";
import Logo from "../../Assets/Logo.png";
import { useNavigate, Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";

function Navbar() {
  return (
    <nav className="navbar navbar-light bg-light shadow-sm">
      <div className="container container-fluid">
        <div className="navbar-brand">
          <Link to={"/"}>
            <img src={Logo} alt="Reactogram" className="nav-logo" />
          </Link>
        </div>
        <form className="d-flex navbar-form">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <div className="search-icon d-flex justify-content-center align-items-center">
            <i
              className="fa-solid fa-magnifying-glass fa-lg "
              style={{ color: "#000000" }}
            ></i>
          </div>
          <div className="nav-links-sec">
            <ul className="nav-links navbar-nav ">
              <li className="link-item">
                {" "}
                <a href="/" className="nav-link">
                  <i
                    className="fa-solid fa-house fa-lg"
                    style={{ color: "#000000" }}
                  ></i>
                </a>
              </li>
              <li className="link-item">
                {" "}
                <a href="/" className="nav-link">
                  <i
                    className="fa-regular fa-heart fa-lg heart-nav"
                    style={{ color: "#000000" }}
                  ></i>
                </a>
              </li>
              <li className="link-item">
                <Dropdown>
                  <Dropdown.Toggle
                    className="profile-dropdown"
                    id="dropdown-basic"
                  >
                    <Link to={"/profile"} className="nav-link">
                      <i
                        className="fa-regular fa-user fa-lg"
                        style={{ color: "#000000" }}
                      ></i>
                    </Link>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            </ul>
          </div>
        </form>
      </div>
    </nav>
  );
}

export default Navbar;
