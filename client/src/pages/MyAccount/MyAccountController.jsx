import React, { useEffect, useState } from 'react'
import MyAccount from './MyAccount'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { callApiAction } from '../../redux/actions/commonAction'
import { getAddressApi, updateAddressApi } from '../../api/address.api'
import { toTitleCase } from '../../utils/helper'
import { callSnackBar } from '../../redux/actions/snackbarAction'
import { SNACK_BAR_VARIETNS } from '../../utils/constants'

function MyAccountController() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user} = useSelector(state => state)
    const userId = user?.data?.user?.id
    const email = user?.data?.user?.email
    const jwt = user?.data?.jwt

    const defaultFormData = {
        err : '',
        fullName: '',
        address: '',
        city : '',
        zipCode: '',
        country: '',
        user : userId,
    }
    const[formData, setFormData] = useState(defaultFormData)
    const[loading,setLoading] = useState(false)
    const[addressId, setAddressId] = useState('')

    const openResetPassword = () => {
        navigate('/passwordreset')
    }

    const getValidationSchema = () => {
        return [
          {
            field: 'fullName',
            name: "Full Name",
            required: true,
          },
          {
            field : 'address',
            name: "Address",
            required : true,
          },
          {
            field : 'city',
            name: "City",
            required : true,
          },
          {
            field : 'zipCode',
            name : 'Zip Code',
            required : true,
          },
          {
            field : 'country',
            name : 'Country',
            required : true,
          },
        ]
    }

    const fetchAddress = () => {
        setLoading(true)
        dispatch(
            callApiAction(
                async () => await getAddressApi(userId, jwt),
                (response) => {
                    if(response?.data?.data?.length == 0) {
                        setLoading(false)
                        return
                    }
                    setLoading(false)
                    setFormData(response?.data?.data[0]?.attributes)
                    setAddressId(response?.data?.data[0]?.id)
                },
                (err) => {
                  setLoading(false)
                    
                }
            )
        )
    }

    useEffect(() => {
        fetchAddress()
    },[userId])

    const updateAddress = async (e) => {
        e.preventDefault()
        setLoading(true)
        const dataToBepassed = {
          data : formData
        }
        dispatch(
          callApiAction(
            async () =>  await updateAddressApi(addressId, dataToBepassed, jwt),
              (response) => {
                dispatch(callSnackBar("Details Updated!!", SNACK_BAR_VARIETNS.suceess))
                setLoading(false)
                },
                (err) => {
                    dispatch(callSnackBar("Cannot Update Details!!", SNACK_BAR_VARIETNS.error))
                    setLoading(false)
                }
              )
            )
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
            updateAddress((e))
          }
      }

      const handleSubmit = async (e) => {
        createFunction(e)
      }

  return (
    <div>
      <MyAccount 
        openResetPassword={openResetPassword}
        formData={formData}
        setFormData={setFormData}
        loading={loading}
        userEmail={email}
        handleSubmit={handleSubmit}
      />
    </div>
  )
}

export default MyAccountController
