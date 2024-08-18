import React from 'react'

function OTPVerifyier() {
  return (
    <div className="layout flexLayout">
    <div className="leftSideBar">
      <div className="leftSideContainer">
        <div className="header">
          <span> Support Creators, Own Unique Plush Collectibles </span>
        </div>
        <div className="description">
          Crowdfund time-limited and exclusive plush toys from your favorite creators. You will not be charged if the project doesn't reach it's goal
          <span></span>
        </div>
        <div className="relationManagementIllustrationWrapper">
          <img
            src="./img/T-Rexy.png"
            className="relationManagementIllustration"
            alt="Relationship Management"
          />
        </div>
        <div className="customerLogosHeader">
          Trusted by teams at these great brands
        </div>
        <div className="customerLogos">
          {/* Add your SVGs or logos here */}
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
            >
              {/* Add your SVG content here */}
            </svg>
            <h3 className="authHeader">Veify OTP</h3>
            <h5 className="authSubHeader">
              Enter your email address below. We’ll send you instructions to reset your password.
            </h5>
            <div className="d-flex align-items-center justify-content-center w-100 formMargins">
              <form className="w-100">
                <div className="formField">
                  <div>
                    <div className="formField marginBottom">
                      <div className="root">
                        <label htmlFor="email-address" className="label">
                          <span>Work email address</span>
                        </label>
                        <div className="inputWrap">
                          <input
                            type="email"
                            name="email"
                            autoComplete="email"
                            placeholder=""
                            id="email-address"
                            required="required"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  )
}

export default OTPVerifyier
