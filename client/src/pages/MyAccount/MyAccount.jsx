import React from 'react';
import './MyAccount.scss';
import { useDispatch, useSelector } from 'react-redux';
import PasswordReset from '../PasswordReset/PasswordReset';
import { useNavigate } from 'react-router-dom';

const MyAccount = ({
  openResetPassword,
  formData,
  setFormData,
  loading,
  userEmail,
  handleSubmit,
}) => {
  
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
              </div>
            </div>
          </div>

          <div className="_root">
          <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
          >
            <div className="_whiteBase">
              <h2 className="_h2">Address Detail</h2>
              <div className="_container">
                
                <div className="_width">
                  <div className="_inputRoot">
                    <label htmlFor="form-input-3" className="_label"><span>Full name</span></label>
                    <div className="_inputWrap">
                      <input 
                        type="text" 
                        name="fullName" 
                        id="form-input-3" 
                        disabled={loading}
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            err: '',
                            fullName: e.target.value,
                          })
                        }
                        required 
                        />
                    </div>
                  </div>
                </div>
                <div className="_width">
                  <div className="_inputRoot">
                    <label htmlFor="form-input-4" className="_label"><span>Shipping Address</span></label>
                    <div className="_inputWrap">
                      <textarea 
                        type="text" 
                        name="address" 
                        cols={81}
                        rows={5}
                        id="form-input-4"
                        disabled={loading}
                        value={formData.address}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            err: '',
                            address: e.target.value,
                          })
                        } 
                        required 
                      />
                    </div>
                  </div>
                </div>

                <div className="_width">
                  <div className="_inputRoot">
                    <label htmlFor="form-input-4" className="_label"><span>City</span></label>
                    <div className="_inputWrap">
                      <input 
                        type="text" 
                        name="city" 
                        id="form-input-4"
                        disabled={loading}
                        value={formData.city}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            err: '',
                            city: e.target.value,
                          })
                        }
                        required 
                      />
                    </div>
                  </div>
                </div>

                <div className="_width">
                  <div className="_inputRoot">
                    <label htmlFor="form-input-4" className="_label"><span>ZIP Code</span></label>
                    <div className="_inputWrap">
                      <input 
                        type="text" 
                        name="zip code" 
                        id="form-input-4"
                        disabled={loading}
                        value={formData.zipCode}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            err: '',
                            zipCode: e.target.value,
                          })
                        }
                        required 
                      />
                    </div>
                  </div>
                </div>

                <div className="_width">
                  <div className="_inputRoot">
                    <label htmlFor="form-input-3" className="_label"><span>Country</span></label>
                    <div className="_inputWrap">
                      <input 
                        type="text" 
                        name="country" 
                        id="form-input-3"
                        disabled={loading}
                        value={formData.country}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            err: '',
                            country: e.target.value,
                          })
                        }  
                        required 
                      />
                    </div>
                  </div>
                </div>
                <div className="_width">
                  <div className="_inputRoot">
                    <label htmlFor="form-input-4" className="_label"><span>Email</span></label>
                    <div className="_inputWrap">
                      <input 
                        type="text" 
                        name="Email" 
                        id="form-input-4" 
                        value={userEmail}
                        readOnly 
                      />
                    </div>
                  </div>
                </div>
                </div>
              
              <div className="_btnContainer">
                <button className="_cancelBtn">Cancel</button>
                <button className="_saveBtn" type='submit'>Update</button>
              </div>
            </div>
            </form>

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