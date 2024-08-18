import React, { useEffect, useState } from 'react'
import PasswordReset from './PasswordReset'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { callSnackBar } from '../../redux/actions/snackbarAction'
import { callApiAction } from '../../redux/actions/commonAction'
import { SNACK_BAR_VARIETNS } from '../../utils/constants'
import { getUserByEmailApi } from '../../api/user.api'
import { generateOTP, validateEmail } from '../../utils/helper'

function PasswordResetController() {
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
        const randomOTP = generateOTP()
        const dataToPass = {
            otp : randomOTP,
            email : user?.data?.user?.email,
            id : user?.data?.user?.id,
        }
      navigate('/verifyOTP', {state : dataToPass})
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
                if(response?.data?.length == 0) {
                  setFormData({
                    ...formData,
                    err : "Your email does not exits please sign up as new user",
                  })
                  return
                }
                else if(response?.data[0]?.email == formData.email) {
                    const randomOTP = generateOTP()
                    const dataToPass = {
                        otp : randomOTP,
                        email : formData.email,
                        id : response?.data[0]?.id,
                    }
                    navigate('/verifyOTP', {state : dataToPass})
                }
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
    <div>
      <PasswordReset  
        formData={formData}
        setFormData={setFormData}
        loading={loading}
        verifyUserEmail={verifyUserEmail}

    />
    </div>
  )
}

export default PasswordResetController
