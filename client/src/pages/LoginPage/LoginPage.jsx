import React from "react";
import "./LoginPage.scss";
import { GoogleLogin } from "@react-oauth/google";

function LoginPage({
  state,
  setState,
  onSubmit,
  handleGoogleLoginSuccess,
  handleGoogleLogout,
}) {
  return (
    <div className="layout">
      <div className="leftSideBar">
        <div className="leftSideContainer">
          <div className="header">
            <span> Support Creators, Own Unique Plush Collectibles </span>
          </div>
          <div className="description">
            Crowdfund time-limited and exclusive plush toys from your favorite
            creators. You will not be charged if the project doesn't reach it's
            goal
          </div>
          <div className="relationManagementIllustrationWrapper">
            <img
              src="./img/Bulldog.png"
              className="relationManagementIllustration"
              alt="Illustration"
            />
          </div>
        </div>
      </div>

      <div className="content">
        <div className="authParent">
          <div className="d-flex justify-content-center h-100 w-100">
            <div className="innerView">
              <svg
                fill="none"
                height="70"
                width="154"
                xmlns="http://www.w3.org/2000/svg"
              ></svg>
              <h3 className="authHeader">Welcome back</h3>
              <div className="d-flex flex-column align-items-center justify-content-center w-100 formMargins">
                <div className="row w-100">
                  <div className="root">
                    {/* <div id="googleSignupButton">
                      
            
                     <GoogleLogin
                        onSuccess={handleGoogleLoginSuccess}
                        onError={() => {
                          console.log("Login Failed");
                        }}
                      />
                    </div> */}
                  </div>
                </div>
                <div className="w-100 breaker">
                  <div className="line"></div>
                  <div className="text">or</div>
                  <div className="line"></div>
                </div>
                <form className="w-100" onSubmit={onSubmit}>
                  <div className="formField">
                    <label htmlFor="email-address" className="label">
                      <span>Email address</span>
                    </label>

                    <div className="inputWrap">
                      <input
                        type="email"
                        name="Identifier"
                        onChange={(e) =>
                          setState({
                            ...state,
                            err: "",
                            identifier: e.target.value,
                          })
                        }
                        value={state.identifier}
                        required
                      />
                    </div>
                  </div>
                  <div className="formField">
                    <label htmlFor="form-input-1" className="label">
                      <span>Password</span>
                    </label>

                    <div className="inputWrap">
                      <input
                        type="password"
                        name="password"
                        value={state.password}
                        onChange={(e) =>
                          setState({
                            ...state,
                            err: "",
                            password: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>
                  {/* <label className="checkboxContainer">
                    <input type="checkbox" className="checkboxInput" />
                    <span>Keep me logged in</span>
                  </label> */}
                  <div>
                    <button className="btn_auth">Log in</button>
                  </div>
                  <div className="forgotPassword">
                    <a href="/passwordreset" className="textButton">
                      Forgot password?
                    </a>
                  </div>
                  <div className="other">
                    Don’t have an account yet?{" "}
                    <a href="/signup" className="textButton">
                      Sign up now
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
