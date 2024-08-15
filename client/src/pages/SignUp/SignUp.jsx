import React from "react";
import "./SignUp.scss";
import { GoogleLogin } from "@react-oauth/google";

function SignUp() {
  return (
      <div className="layout">
        <div className="leftSideBar">
          <div className="leftSideContainer">
            <div className="header">
              <span>Support Creators, Own Unique Plush Collectibles</span>
            </div>
            <div className="description">
              Crowdfund time-limited and exclusive plush toys from your favorite
              creators. You will not be charged if the project doesn't reach its
              goal.
            </div>
            <div className="relationManagementIllustrationWrapper">
              <img
                src="./img/Basket1.png"
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
                <h3 className="authHeader">Sign Up in 30 seconds</h3>
                <div className="other">
                  Already have an account?{" "}
                  <a href="/loginpage" className="textButton">
                    Log in now
                  </a>
                </div>
                <div className="d-flex flex-column align-items-center justify-content-center w-100 formMargins">
                  <div id="googleSignupButton">
                    <GoogleLogin
                      onSuccess={(credentialResponse) => {
                        console.log(credentialResponse);
                      }}
                      onError={() => {
                        console.log("Login Failed");
                      }}
                    />
                  </div>
                  <div className="w-100 breaker">
                    <div className="line"></div>
                    <div className="text">or</div>
                    <div className="line"></div>
                  </div>
                  {/* Form Fields */}
                  <form className="w-100">
                    <div className="formField marginBottom">
                      <div className="root">
                        <label htmlFor="full-name" className="label">
                          <span>Full name (will be used for the shipment)</span>
                        </label>
                        <div className="inputWrap">
                          <input
                            type="text"
                            name="fullName"
                            autoComplete="name"
                            id="full-name"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="formField marginBottom">
                        <div className="root">
                          <label htmlFor="email-address" className="label">
                            <span>Email address</span>
                          </label>
                          <div className="inputWrap">
                            <input
                              type="email"
                              name="email"
                              autoComplete="email"
                              id="email-address"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="formField marginBottom">
                      <div className="position">
                        <div className="root">
                          <label htmlFor="form-input-2" className="label">
                            <span>Password</span>
                          </label>
                          <div className="inputWrap">
                            <input
                              type="password"
                              name="password"
                              autoComplete="new-password"
                              id="form-input-2"
                              required
                            />
                          </div>
                        </div>
                        <div className="formField__passwordEye">
                          {/* SVG for Password Eye */}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="button main">
                        <button
                          disabled
                          type="submit"
                          className="w-100 btn_auth"
                        >
                          Sign me up
                        </button>
                      </div>
                    </div>
                    <div className="tos">
                      By signing up, I agree to the{" "}
                      {/* <a
                        href="https://www.plush.fun/legal/privacy-policy"
                        target="_blank"
                        className="textButton secondary"
                      >
                        Privacy Policy
                      </a>{" "} */}
                      &nbsp;and&nbsp;{" "}
                      {/* <a
                        href="https://www.plush.fun/legal/terms-of-service"
                        target="_blank"
                        className="textButton secondary"
                      >
                        Terms of Service
                      </a> */}
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div state=""></div>
          </div>
        </div>
      </div>
  );
}

export default SignUp;
