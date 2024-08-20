import React from 'react';
import './MyAccount.scss';
import { useDispatch } from 'react-redux';
import PasswordReset from '../PasswordReset/PasswordReset';
import { useNavigate } from 'react-router-dom';

const MyAccount = () => {
  const navigate = useNavigate()
  const openResetPassword = () => {
   navigate('/passwordreset')
  }
  return (
    <div className="layout">
      <div className="_container">
        <div className="_header">
          <a href="/" className="router-link-active _logoContainer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 168 64" fill="none" className="_plushLogo">
              <path d="M60.321 32.01C60.321 47.1656 48.0349 59.4517 32.8793 59.4517C17.7237 59.4517 5.43762 47.1656 5.43762 32.01C5.43762 16.8544 17.7237 4.56833 32.8793 4.56833C48.0349 4.56833 60.321 16.8544 60.321 32.01Z" fill="var(--plush-logo-color)"></path>
              {/* Replace with Plush.fun logo paths */}
            </svg>
          </a>
        </div>


        <main id="mainContent" className="_main">
          <div className="_settingsMain">
            <div className="_container _row _spaceBetween">
              <div className="_row">
                <h1 className="_title">Settings</h1>
              </div>
            </div>
          </div>

          <div className="_tabsContainer">
            <div className="w-100 select-none bg-white">
              <div className="flex">
                <a href="/account-settings" className="router-link-exact-active router-link-active _menuItem" aria-current="page">Account Settings</a>
                <a href="/workspace-settings" className="_menuItem">Workspace Settings</a>
                <a href="/team-members" className="_menuItem">Team Members</a>
              </div>
            </div>
          </div>

          <div className="_root">
            <div className="_whiteBase">
              <h2 className="_h2">Basic information</h2>
              <div className="_container">
                <div className="_width">
                  <div className="_inputRoot">
                    <label htmlFor="form-input-3" className="_label"><span>Full name</span></label>
                    <div className="_inputWrap">
                      <input type="text" name="fullName" id="form-input-3" required />
                    </div>
                  </div>
                </div>
                <div className="_width">
                  <div className="_inputRoot">
                    <label htmlFor="form-input-4" className="_label"><span>Work email address</span></label>
                    <div className="_inputWrap">
                      <input type="email" name="email" id="form-input-4" required />
                    </div>
                  </div>
                </div>
              </div>
              <div className="_btnContainer">
                <button className="_cancelBtn">Cancel</button>
                <button className="_saveBtn" disabled>Save</button>
              </div>
            </div>

            <div className="_whiteBase">
              <h2 className="_h2">Reset password</h2>
              <button className="_mainBtn" onClick={openResetPassword}>Reset Password</button>
            </div>

            <div className="_whiteBase _center">
              <div className="_header">Help us improve</div>
              <div className="_description">Take a minute to let us know how we can improve and do better</div>
              <button className="_mainBtn">Give feedback</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MyAccount;