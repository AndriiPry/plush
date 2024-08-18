import React from 'react'

function CreatePassword({
    formData,
    setFormData,
    handlePasswordUpdate
}) {
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
        <h3 className="authHeader">Create New Pasword</h3>
        <div className="d-flex align-items-center justify-content-center w-100 formMargins">
        <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handlePasswordUpdate(e);
                        }}
                    >
                        <div className="formField marginBottom">
                            <label htmlFor="new-password">New Password</label>
                            <input
                                type="password"
                                name="newPassword"
                                id="new-password"
                                value={formData.password}
                                onChange={(e) =>
                                  setFormData({ ...formData, password: e.target.value })
                                }
                                required
                            />
                        </div>
                        <div className="formField marginBottom">
                            <label htmlFor="confirm-password">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                id="confirm-password"
                                value={formData.confirmPassword}
                                onChange={(e) =>
                                    setFormData({ ...formData, confirmPassword: e.target.value })
                                }
                                required
                            />
                        </div>
                        <button type="submit">Create Password</button>
                    </form>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
  )
}

export default CreatePassword
