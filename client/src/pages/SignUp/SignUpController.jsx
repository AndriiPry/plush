import React, { useState } from 'react'
import SignUp from './SignUp'
import { toTitleCase, validateEmail, validatePassword } from '../../utils/helper'
import { useDispatch } from 'react-redux'
import { callSnackBar } from '../../redux/actions/snackbarAction'
import { SNACK_BAR_VARIETNS } from '../../utils/constants'
import useFetch from '../../hooks/useFetch'

function SignUpController() {
    const defaultFormData = {
        err : '',
        fullName : '',
        emailId: '',
        password: '',
    }
    const [formData, setFormData] = useState(defaultFormData)
    console.log("formdata", formData)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();

    const getValidationSchema = () => {
        return [
          {
            field: 'fullName',
            name: "Name",
            required: true,
          },
          {
            field : 'emailId',
            name: "Email",
            required : true,
            validate : () => {
              if (!validateEmail(formData.emailId)) {
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

    const AddUser = async (e) => {
        e.preventDefault()
        setLoading(true);
        const { data, loading, error } = useFetch(
            `/sub-categories?[filters][categories][id][$eq]`
        );
        if(error) {
            setLoading(false)
            setFormData({ ...formData, err : error })
            dispatch(callSnackBar(toTitleCase( error), SNACK_BAR_VARIETNS.error))
        } else {
            setLoading(false)
            setFormData(defaultFormData)
        }
    }

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
            AddUser((e))
          }
      }

      const handleSubmit = async (e) => {
        console.log("Handle submit called")
        createFunction(e)
      }

  return (
    <SignUp  formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} loading={loading}/>
  )
}

export default SignUpController
