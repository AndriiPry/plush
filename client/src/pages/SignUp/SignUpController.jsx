import React, { useState } from 'react'
import SignUp from './SignUp'
import { toTitleCase, validateEmail, validatePassword } from '../../utils/helper'
import { useDispatch } from 'react-redux'
import { callSnackBar } from '../../redux/actions/snackbarAction'
import { SNACK_BAR_VARIETNS } from '../../utils/constants'
import { callApiAction } from '../../redux/actions/commonAction'
import { addUserApi } from '../../api/user.api'
import {jwtDecode} from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

function SignUpController() {
    const defaultFormData = {
        err: '',
        username: '',
        email: '',
    }
  
    const [formData, setFormData] = useState(defaultFormData)
    const [loading, setLoading] = useState(false)
    const [googleAccount, setGoogleAccount] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()

   
    const handleGoogleLoginSuccess = async (credentialResponse) => {
        try {
            const decoded = jwtDecode(credentialResponse.credential);
            console.log("decoded", decoded);
            
            const googleUserData = {
                email: decoded.email,
                username: decoded.name,
                password: credentialResponse.credential,
            };
            
            console.log(decoded);
    
            setLoading(true);
            await dispatch(callApiAction(
                async () => await addUserApi(googleUserData),
                (response) => {
                    setLoading(false);
                    if (response && response.data) {
                        setFormData(defaultFormData);
                        dispatch(callSnackBar("Signed up successfully", SNACK_BAR_VARIETNS.suceess))
                        navigate('/loginPage')
                        
                    }
                },
                (err) => {
                    setLoading(false);
                    setFormData({ ...formData, err });
                    if (err && err.status === 400 && err.message === "Email or Username are already taken") {
                        dispatch(callSnackBar("You are already registered. Please sign in.", SNACK_BAR_VARIETNS.error));
                    } else {
                        dispatch(callSnackBar("Failed to sign in with Google", SNACK_BAR_VARIETNS.error));
                    }
                }
            ));
        } catch (error) {
            console.error("Error handling Google sign-in:", error);
            dispatch(callSnackBar("Failed to sign in with Google", SNACK_BAR_VARIETNS.error));
        }
    };
    

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

    return (
        <SignUp
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            loading={loading}
            handleGoogleLoginSuccess={handleGoogleLoginSuccess}
        />
    )
}

export default SignUpController

