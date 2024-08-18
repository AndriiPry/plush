import React, { useEffect, useState } from 'react';
import './PasswordReset.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { callApiAction } from '../../redux/actions/commonAction';
import { getUserByEmailApi } from '../../api/user.api';
import { toTitleCase, validateEmail } from '../../utils/helper';
import { SNACK_BAR_VARIETNS } from '../../utils/constants';
import { callSnackBar } from '../../redux/actions/snackbarAction';

const PasswordReset = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user} = useSelector(state => state)
  const defaultFormData = {
    email : '',
    err  :''
  }
  const[loading, setLoading] = useState(false)
  const [formData, setFormData] = useState(defaultFormData)
  useEffect(() => {
    if(user.isLoggedIn) {
      navigate('/verifyOTP')
    }
  },[])
  const verifyUserEmail = async (e) => {
    e.preventDefault()
    if(formData.email == "") {
      setFormData({
        ...formData,
        err : "Email is required"
      })
      dispatch(callSnackBar("Email is required", SNACK_BAR_VARIETNS.error))
    }
    else if (!validateEmail(formData.email)) {
      setFormData({
        ...formData,
        err : "Email is invalid"
      })
      dispatch(callSnackBar("Email is invalid", SNACK_BAR_VARIETNS.error))
    } else {
        setLoading(true)
        dispatch(
          callApiAction(
              async () =>  await getUserByEmailApi(formData.email),
              (response) => {
                setLoading(false)
                setFormData(defaultFormData) 
              },
              (err) => {
                  setLoading(false)
                  setFormData({ ...formData, err })
              }
          )
        )
    }
  }
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
              <h3 className="authHeader">Forgot your password?</h3>
              <h5 className="authSubHeader">
                Enter your email address below. We’ll send you instructions to reset your password.
              </h5>
              <div className="d-flex align-items-center justify-content-center w-100 formMargins">
                <form className="w-100" onSubmit={verifyUserEmail}>
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
                              disabled={loading}
                              value={formData.email}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  err: '',
                                  email: e.target.value,
                                })
                              }
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row row">
                      <div className="button main" style={{ '--17cc9de8': 'undefined' }}>
                        <button type="submit" className="w-100 btn-auth">
                          Send instructions
                        </button>
                      </div>
                    </div>
                    <div className="forgotPassword">
                      <a href="/loginpage" className="textButton secondary">
                        Return to Log in
                      </a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;