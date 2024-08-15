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
                      // Handle the response or authentication here
                    }}
                    onError={() => {
                      console.log("Login Failed");
                    }}
                    // You can add additional props here if needed
                  />
                </div>
                <div className="w-100 breaker">
                  <div className="line"></div>
                  <div className="text">or</div>
                  <div className="line"></div>
                </div>
                {/* Form Fields */}
                <form className="w-100">
                  {/* Your form fields */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
