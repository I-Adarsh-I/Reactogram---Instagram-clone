import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import "./auth.css";
import socialDesktop from "../../Assets/social-desktop.PNG";
import socialMobile from "../../Assets/social-mobile.PNG";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import axios from "axios";

function Auth() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  axios.defaults.withCredentials = true;
  
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userLoginHandler = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      if (resp.status === 200) {
        toast.success(resp.data.message);
      } else if (resp.status === 404) {
        toast.error(resp.data.error);
      } else if (resp.status === 401) {
        toast.error(resp.data.error);
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        toast.error(err.response.data.error);
      } else if(err) {
        toast.error("Internal server error");
      }
    }
  };

  return (
    <div className="container auth-main-container">
      <ToastContainer autoClose={5000} />

      <div className="row">
        <div className="col-md-7">
          <img
            src={socialDesktop}
            alt="Miligram relatable content"
            className="auth-img-desk"
          />
          <img src={socialMobile} alt="Logo" className="auth-img-mob" />
        </div>
        <div className="col-md-5">
          <div className="log-main-con p-4 bg-body rounded">
            <div className="login-main-con-head">
              <h3>Login</h3>
            </div>
            <div className="auth-form-con">
              <form
                className="main-auth-form-con"
                onSubmit={handleSubmit(userLoginHandler)}
              >
                <input
                  type="email"
                  {...register("email", { required: true })}
                  id="email"
                  placeholder="Email, Phone number or Username"
                  className="auth-inp"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <span style={{ color: "red", fontSize: "14px" }}>
                    Email field cannot be empty
                  </span>
                )}
                <input
                  type="password"
                  {...register("password", { required: true })}
                  id="password"
                  placeholder="Password"
                  className="auth-inp"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && (
                  <span style={{ color: "red", fontSize: "14px" }}>
                    Please Enter your password
                  </span>
                )}
                <div
                  style={{ display: "flex", gap: "10px", fontSize: " 14px" }}
                >
                  <input type="checkbox" name="rememberMe" id="rememberMe" />
                  <label htmlFor="rememberMe">Remember Me</label>
                </div>
                <button
                  className="btn btn-primary auth-submit-btn"
                  type="submit"
                  onClick={userLoginHandler}
                >
                  Login
                </button>
                <p className="log-opt-para">
                  Don't have an account?{" "}
                  <span style={{ color: "blue", cursor: "pointer" }} onClick={() => navigate('/register')}>
                    Register
                  </span>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
