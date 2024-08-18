import React, { useState } from 'react'
import SignUp from './SignUp'
import { toTitleCase, validateEmail, validatePassword } from '../../utils/helper'
import { useDispatch } from 'react-redux'
import { callSnackBar } from '../../redux/actions/snackbarAction'
import { SNACK_BAR_VARIETNS } from '../../utils/constants'
import { callApiAction } from '../../redux/actions/commonAction'
import { addUserApi } from '../../api/user.api'
import {jwtDecode} from 'jwt-decode'

function SignUpController() {
    const defaultFormData = {
        err: '',
        username: '',
        email: '',
        password: '',
    }
  
    const [formData, setFormData] = useState(defaultFormData)
    const [loading, setLoading] = useState(false)
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [googleAccount, setGoogleAccount] = useState(null)
    const dispatch = useDispatch()

    const handleGoogleLoginSuccess = async (credentialResponse) => {
        try {
            const decoded = jwtDecode(credentialResponse.credential)
            const googleUserData = {
                email: decoded.email,
                username: decoded.name,
                password: credentialResponse.credential 
            }
            setGoogleAccount(googleUserData)
            setShowPasswordForm(true); // Show the password form

            setLoading(true)
            await dispatch(callApiAction(
                async () => await addUserApi(googleUserData),
                (response) => {
                    setLoading(false)
                    setFormData(defaultFormData)
                    setGoogleAccount(null)
                },
                (err) => {
                    setLoading(false)
                    setFormData({ ...formData, err })
                }
            ))
        } catch (error) {
            console.error("Error handling Google sign-in:", error)
            dispatch(callSnackBar("Failed to sign in with Google", SNACK_BAR_VARIETNS.error))
        }
    }

    const getValidationSchema = () => {
        return [
            {
                field: 'username',
                name: "Name",
                required: true,
            },
            {
                field: 'email',
                name: "Email",
                required: true,
                validate: () => {
                    if (!validateEmail(formData.email)) {
                        return "Invalid Email."
                    }
                    return true
                }
            },
            {
                field: 'password',
                name: 'Password',
                required: true,
                validate: () => {
                    if (!validatePassword(formData.password)) {
                        return "Invalid Password."
                    }
                    return true
                }
            },
        ]
    }

    const addUser = async (e) => {
        e.preventDefault()
        setLoading(true)
        const dataToBePassed = { ...formData }
        if (googleAccount) {
            dataToBePassed.googleAccount = googleAccount.googleToken
        }
        
        dispatch(
            callApiAction(
                async () => await addUserApi(dataToBePassed),
                (response) => {
                    setLoading(false)
                    setFormData(defaultFormData)
                    setGoogleAccount(null)
                },
                (err) => {
                    setLoading(false)
                    setFormData({ ...formData, err })
                }
            )
        )
    }

    const createFunction = async (e) => {
        const requiredFields = getValidationSchema()
        let hasError = false
        for (const fieldObj of requiredFields) {
            if (fieldObj.required && !formData[fieldObj.field]) {
                hasError = true
                setFormData({
                    ...formData,
                    err: toTitleCase(fieldObj.name ? fieldObj.name : fieldObj.field) + " is required"
                })
                dispatch(callSnackBar(toTitleCase(fieldObj.name ? fieldObj.name : fieldObj.field) + " is required", SNACK_BAR_VARIETNS.error))
                break
            } else if (fieldObj.validate && fieldObj.validate() !== true) {
                hasError = true
                setFormData({
                    ...formData,
                    err: toTitleCase(fieldObj.name ? fieldObj.name : fieldObj.field) + " is invalid"
                })
                dispatch(callSnackBar(fieldObj.validate(), SNACK_BAR_VARIETNS.error))
                break
            }
        }
        if (!hasError) {
            addUser(e)
        }
    }

    const handleSubmit = async (e) => {
        createFunction(e)
    }

    //password

    const defaultPasswordData = {
      err: '',
      email: '',
      password: '',
  }

    const [passData, setPassData] = useState(defaultPasswordData)

    const handlePasswordUpdate = async (e) => {
      e.preventDefault();
      if (formData.password !== formData.confirmPassword) {
          setFormData({
              ...formData,
              err: "Passwords do not match.",
          });
          dispatch(callSnackBar("Passwords do not match.", SNACK_BAR_VARIETNS.error));
          console.log(formData)
          return;
      }
  
      // try {
      //     setLoading(true);
      //     const dataToBePassed = {
      //         email: googleAccount.email,
      //         newPassword: formData.password,
      //     };
      //     await dispatch(callApiAction(
      //         async () => await updatePasswordApi(dataToBePassed),
      //         (response) => {
      //             setLoading(false);
      //             setFormData(defaultFormData);
      //             setGoogleAccount(null);
      //             setShowPasswordForm(false); // Hide the password form
      //         },
      //         (err) => {
      //             setLoading(false);
      //             setFormData({ ...formData, err });
      //         }
      //     ));
      // } catch (error) {
      //     console.error("Error updating password:", error);
      //     dispatch(callSnackBar("Failed to update password", SNACK_BAR_VARIETNS.error));
      // }
  };
  
    return (
        <SignUp
            formData={formData}
            setFormData={setFormData}
            passData={passData}
            setPassData={setPassData}
            handleSubmit={handleSubmit}
            loading={loading}
            handleGoogleLoginSuccess={handleGoogleLoginSuccess}
            showPasswordForm={showPasswordForm}
            handlePasswordUpdate={handlePasswordUpdate}
        />
    )
}

export default SignUpController

