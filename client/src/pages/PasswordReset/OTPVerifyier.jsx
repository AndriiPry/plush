import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { sendResetPasswordEmailApi } from '../../api/auth.api'
import { useDispatch } from 'react-redux'
import { callSnackBar } from '../../redux/actions/snackbarAction'
import { SNACK_BAR_VARIETNS } from '../../utils/constants'
import { callApiAction } from '../../redux/actions/commonAction'
import { Typography } from '@mui/material'

function OTPVerifyier({
}) {
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const defaultFormData = {
    otp : '',
    err : '',
  }
  const[formData, setFormData] = useState(defaultFormData)
  const otp =  location.state.otp
  const email = location.state.email
  const id = location.state.id
  const otpSender = () => {
    const dataToBePassed = { 
      to : email,
      subject : "Verify OTP",
      text: `OTP for reseting the password = ${otp}`
     }
      dispatch(
        callApiAction(
            async () => await sendResetPasswordEmailApi(dataToBePassed),
            (response) => {
              dispatch(callSnackBar("Please check your email for otp", SNACK_BAR_VARIETNS.info))
            },
            (err) => {
              dispatch(callSnackBar("something went wrong", SNACK_BAR_VARIETNS.error))
                
            }
        )
    )
  }
  useEffect(() => {
    otpSender()
  },[otp])
  const handleOTPVerifier = (e) => {
    e.preventDefault()
      if(otp == formData.otp) {
        navigate("/createPassword", {state : id})
      }
      else {
        setFormData({
          ...formData,
          err : "Invalid OTP"
        })
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
            <h3 className="authHeader">Verify OTP</h3>
            <div className="d-flex align-items-center justify-content-center w-100 formMargins">
              <form className="w-100" onSubmit={handleOTPVerifier}>
                <div className="formField">
                  <div>
                    <div className="formField marginBottom">
                      <div className="root">
                        
                        <Typography variant="subtitle1" color={'red'}>
                              {formData.err}{' '}
                          </Typography>
                        <div className="inputWrap">
                          <input
                            type="number"
                            name="otp"
                            placeholder="Enter OTP"
                            id="otp"
                            value={formData.otp}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  err: '',
                                  otp: e.target.value,
                                })
                              }
                            required
                          />
                        </div>
                      </div>
                      <div className="button main" style={{ '--17cc9de8': 'undefined' }}>
                        <button type="submit" className="w-100 btn-auth">
                          Verify
                        </button>
                        
                      </div>
                    </div>
                    <button type="button" onClick={otpSender} className="w-100 btn-auth">
                          Have Not Received OTP ?
                    </button>
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
