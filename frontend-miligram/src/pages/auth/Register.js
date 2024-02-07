import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./auth.css";
import socialDesktop from "../../Assets/social-desktop.PNG";
import socialMobile from "../../Assets/social-mobile.PNG";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { BASE_API } from "../../config";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  
  axios.defaults.withCredentials = true;

  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");

  const userSignUpHandler = async (e) => {
    e.preventDefault()
    try {
      const resp = await axios.post(`${BASE_API}/signup`, {
        number,
        fullname,
        email,
        password,
      });
      if (resp.status === 200) {
        toast.success(resp.data.message);
        navigate('/');
      } else if (resp.status === 404) {
        console.log(resp.data.message);
        toast.error(resp.data.message);
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
      } else {
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
               <h3>Sign Up</h3>
            </div>
            <div className="auth-form-con">
              <form
                className="main-auth-form-con"
                onSubmit={handleSubmit(userSignUpHandler)}
              >
                <input
                  type="text"
                  {...register("number", { required: true })}
                  id="number"
                  placeholder="Contact no."
                  className="auth-inp"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                />
                {errors.number && (
                  <span style={{ color: "red", fontSize: "14px" }}>
                    Please enter a valid Phone number
                  </span>
                )}
                <input
                  type="text"
                  {...register("full_name", { required: true })}
                  id="full_name"
                  className="auth-inp"
                  placeholder="Full name"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                />
                {errors.full_name && (
                  <span style={{ color: "red", fontSize: "14px" }}>
                    This field is required
                  </span>
                )}

                <input
                  type="email"
                  {...register("email", { required: true })}
                  id="email"
                  placeholder='email'
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
                  onClick={userSignUpHandler}
                >
                  Sign Up
                </button>

                <p className="log-opt-para">
                  Already have an account?{" "}
                  <span style={{ color: "blue", cursor: "pointer" }} onClick={() => navigate('/')}>
                    Login
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

export default Register;
