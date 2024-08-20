import React, { useState } from 'react'
import CreatePassword from './CreatePassword'
import { callSnackBar } from '../../redux/actions/snackbarAction';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { SNACK_BAR_VARIETNS } from '../../utils/constants';
import { callApiAction } from '../../redux/actions/commonAction';
import { updateUserApi } from '../../api/user.api';

function CreatePasswordController() {
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const defaultFormData = {
        err: '',
        password: '',
        confirmPassword: '',  
    }
  
    const [formData, setFormData] = useState(defaultFormData)
    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setFormData({
                ...formData,
                err: "Passwords do not match.",
            });
            dispatch(callSnackBar("Passwords do not match.", SNACK_BAR_VARIETNS.error));
            return;
        }
        try {
    
          
        const dataToBePassed = {
            password: formData.password,
        };
    
            await dispatch(callApiAction(
                async () => await updateUserApi(location.state, dataToBePassed, process.env.REACT_APP_API_TOKEN),
                (response) => {
                    setFormData(defaultFormData);; 
                    dispatch(callSnackBar("Password updated successfully", SNACK_BAR_VARIETNS.suceess));
                    navigate('/loginpage')
                },
                (err) => {
                    setFormData({ ...formData, err });
                    dispatch(callSnackBar("Failed to update password", SNACK_BAR_VARIETNS.error));
                }
            ));
        } catch (error) {
            console.error("Error updating password:", error);
            dispatch(callSnackBar("Failed to update password", SNACK_BAR_VARIETNS.error));
        }
    };
  return (
    <div>
      <CreatePassword  handlePasswordUpdate={handlePasswordUpdate} formData={formData} setFormData={setFormData}/>
    </div>
  )
}

export default CreatePasswordController
