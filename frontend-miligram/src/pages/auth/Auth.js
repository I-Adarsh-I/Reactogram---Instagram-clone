import React, { useState } from "react";
import "./auth.css";
import socialDesktop from "../../Assets/social-desktop.PNG";
import socialMobile from "../../Assets/social-mobile.PNG";
import { useForm } from "react-hook-form";

function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);

  const changeAuth = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
  };

  const {register, handleSubmit, formState:{ errors }} = useForm();

  const formSubmit = (data) => {
    console.log(data)
  }

  return (
    <div className="container auth-main-container">
      <div className="row">
        <div className="col-md-7">
          <img src={socialDesktop} alt="Miligram relatable content" className="auth-img-desk"/>
          <img src={socialMobile} alt="Logo" className="auth-img-mob"/>
        </div>
        <div className="col-md-5">
          <div className="log-main-con p-4 bg-body rounded">
            <div className="login-main-con-head">
              {!isSignUp ? <h3>Login</h3> : <h3>Sign Up</h3>}
            </div>
            <div className="auth-form-con">
              <form className="main-auth-form-con" onSubmit={handleSubmit(formSubmit)}>
                {isSignUp && (
                  <>
                    <input
                      type="number"
                      {...register("number", {required: true})}
                      id="number"
                      placeholder="Contact no."
                      className="auth-inp"
                    />
                    {errors.number && <span style={{color:'red', fontSize:'14px'}}>Please enter a valid Phone number</span>}
                    <input
                      type="text"
                      {...register("full_name", {required:true})}
                      id="full_name"
                      className="auth-inp"
                      placeholder="Full name"
                    />
                    {errors.full_name && <span style={{color:'red', fontSize:'14px'}}>This field is required</span>}
                  </>
                )}

                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder={ isSignUp ? 'Email' : 'Email, Phone number or Username'}
                  className="auth-inp"
                />
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="auth-inp"
                />
                <div style={{display:'flex', gap:"10px", fontSize:" 14px"}}>
                <input type="checkbox" name="rememberMe" id="rememberMe"/>
                <label htmlFor="rememberMe">Remember Me</label>
                </div>
                {/* <button className="btn btn-primary auth-submit-btn">{!isSignUp ? 'Login' : 'Signup'} </button> */}
                {!isSignUp ? <button className="btn btn-primary auth-submit-btn" type="submit">Login</button> : <button className="btn btn-primary auth-submit-btn" type="submit">Sign Up</button>}
                {!isSignUp ? (
                  <p className="log-opt-para">
                    Don't have an account?{" "}
                    <span
                      style={{ color: "blue", cursor: "pointer" }}
                      onClick={changeAuth}
                    >
                      Register
                    </span>
                  </p>
                ) : (
                  <p className="log-opt-para">
                    Already have an account?{" "}
                    <span
                      style={{ color: "blue", cursor: "pointer" }}
                      onClick={changeAuth}
                    >
                      Login
                    </span>
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
