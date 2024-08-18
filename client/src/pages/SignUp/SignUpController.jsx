import React, { useState } from 'react'
import SignUp from './SignUp'
import { toTitleCase, validateEmail, validatePassword } from '../../utils/helper'
import { useDispatch } from 'react-redux'
import { callSnackBar } from '../../redux/actions/snackbarAction'
import { SNACK_BAR_VARIETNS } from '../../utils/constants'
import useFetch from '../../hooks/useFetch'
import { callApiAction } from '../../redux/actions/commonAction'
import { addUserApi, sendConfirmEmailApi, updateUserApi } from '../../api/user.api'

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
                    setLoading(false)
                    setFormData(defaultFormData)
                    updateUser(response?.data)
                    console.log(response) // jwt = response.data.jwt, id = response.data.user.id 
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
                },
                (err) => {
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

  return (
    <SignUp  formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} loading={loading}/>
  )
}

export default SignUpController
