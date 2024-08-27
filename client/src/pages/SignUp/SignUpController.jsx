import React, { useState } from 'react'
import SignUp from './SignUp'
import { toTitleCase, validateEmail, validatePassword } from '../../utils/helper'
import { useDispatch } from 'react-redux'
import { callSnackBar } from '../../redux/actions/snackbarAction'
import { actions, SNACK_BAR_VARIETNS } from '../../utils/constants'
import { callApiAction } from '../../redux/actions/commonAction'
import { addUserApi, sendConfirmEmailApi, updateUserApi } from '../../api/user.api'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { signInAction } from '../../redux/actions/userReducerAction'

function SignUpController() {
    const defaultFormData = {
        err : '',
        username : '',
        email: '',
        password: '',
    }
    const [formData, setFormData] = useState(defaultFormData)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const getValidationSchema = () => {
        return [
          {
            field: 'username',
            name: "Name",
            required: true,
          },
          {
            field : 'email',
            name: "Email",
            required : true,
            validate : () => {
              if (!validateEmail(formData.email)) {
                return "Invalid Email."
              }
              return true
            }
          },
          {
            field : 'password',
            name : 'Password',
            required : true,
            validate : () => {
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
            const dataToBepassed = {}
            for (let item in formData) {
                if (formData[item] && formData[item] !== '') {
                    dataToBepassed[item] = formData[item]
                }
            }
    
            dispatch(
              callApiAction(
                  async () =>  await addUserApi(dataToBepassed),
                  (response) => {
                    setFormData(defaultFormData)
                    updateUser(response?.data)
                  },
                  (err) => {
                      setLoading(false)
                      setFormData({ ...formData, err })
                  }
              )
            )
      }

      const updateUser = async (data) => {
        const dataToBepassed = {
          confirmed : false,
        }
        dispatch(
          callApiAction(
            async () =>  await updateUserApi(data?.user?.id, dataToBepassed, data?.jwt),
              (response) => {
                sendConfirmationEmail(data?.user?.email)
                },
                (err) => {
                  setLoading(false)
                }
              )
            )
      }

      const sendConfirmationEmail = async (email) => {
        const dataToBepassed = {
          email : email,
        }
        dispatch(
          callApiAction(
            async () =>  await sendConfirmEmailApi(dataToBepassed),
              (response) => {
                dispatch(callSnackBar(toTitleCase("Please Verify your email"), SNACK_BAR_VARIETNS.suceess))
                setLoading(false)
                navigate('/loginPage')
                },
                (err) => {
                  setLoading(false)
                }
              )
            )
      }
    // dispatch(callSnackBar(toTitleCase( error), SNACK_BAR_VARIETNS.error))
       

    const createFunction = async (e) => {
        const requiredFields = getValidationSchema();
          let hasError = false
          for (const fieldObj of requiredFields) {
            if (fieldObj.required && !formData[fieldObj.field]) {
              hasError = true
              setFormData({
                ...formData,
                err : toTitleCase(fieldObj.name ? fieldObj.name : fieldObj.field) + "  is required"
              })
              dispatch(callSnackBar(toTitleCase(fieldObj.name ? fieldObj.name : fieldObj.field) + "  is required", SNACK_BAR_VARIETNS.error))
              break;
            }
            else if (fieldObj.validate && fieldObj.validate() !== true) {
              hasError = true
              setFormData({
                ...formData,
                err : toTitleCase(fieldObj.name ? fieldObj.name : fieldObj.field) + "  is invalid"
              })
              dispatch(callSnackBar(fieldObj.validate(), SNACK_BAR_VARIETNS.error))
              break;
            }
          }
          if (!hasError ) {
            addUser((e))
          }
      }

      const handleSubmit = async (e) => {
        createFunction(e)
      }
      const handleGoogleLoginSuccess = async (credentialResponse) => {
        try {
            const decoded = jwtDecode(credentialResponse.credential);
            
            const googleUserData = {
                email: decoded.email,
                username: decoded.name,
                password: credentialResponse.credential,
            };
            
            
    
            setLoading(true);
            await dispatch(callApiAction(
                async () => await addUserApi(googleUserData),
                (response) => {
                    setLoading(false);
                    
                    if (response && response.data) {
                        setFormData(defaultFormData);
                        dispatch(callSnackBar("Signed up successfully", SNACK_BAR_VARIETNS.suceess))
                        dispatch(signInAction(
                          {
                            identifier: googleUserData.email,
                            password: googleUserData.password,
                          },
                          (err) => {
                            setFormData(prevState => ({ ...prevState, err }));
                            setLoading(false);
                        },
                        (response) => {
                            dispatch({
                                type: actions.SET_USER, 
                                value: response,
                            });
            
                            dispatch(callSnackBar('Signed in Successfully',SNACK_BAR_VARIETNS.suceess));
                            navigate('/');
                        }
                        ))
                        
                    }
                },
                (err) => {
                    setLoading(false);
                    setFormData({ ...formData, err });
                    if (err && err === "Email or Username are already taken") {
                      dispatch(signInAction(
                        {
                            identifier: googleUserData.email,
                            password: googleUserData.password,
                        },
                        (err) => {
                            setFormData(prevState => ({ ...prevState, err }));
                            setLoading(false);
                        },
                        (response) => {
                            dispatch({
                                type: actions.SET_USER, 
                                value: response,
                            });
            
                            dispatch(callSnackBar('Signed in Successfully',SNACK_BAR_VARIETNS.suceess));
                            navigate('/');
                        }
                    ));
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