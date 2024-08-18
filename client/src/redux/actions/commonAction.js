
import { SNACK_BAR_VARIETNS } from "../../utils/constants"
import { callSnackBar } from "./snackbarAction"
import { signOutAction } from "./userReducerAction"



export const callApiAction = (asyncFun, onSuccess = () => { }, onError = () => { }, isFile = false) => {

    return async (dispatch, getState) => {
        try {
            const response = await asyncFun()
            if (response) {
                if (response?.response?.data?.error?.status == 400) {
                    onError(response?.response?.data?.error?.message)
                    return
                }
                else if(response?.error?.status == 400) {
                    onError(response?.error?.message)
                }
                else {
                    await onSuccess(response)
                }
            } else {
                if(response.errorMessage) {
                    onError(response.errorMessage)
                }
             else if (response.code === 403) {
                dispatch(callSnackBar("Your session has expired due to unautherized access", SNACK_BAR_VARIETNS.error))
                dispatch(signOutAction())
            }
                else if(response.error) {
                    onError(response.error.message)
                }
                
                else{
                    dispatch(callSnackBar(response.message, SNACK_BAR_VARIETNS.error))
                    onError()
                }
            }


        } catch (e) {
            console.log(e)
            onError(e.message)
            console.log("andi mandi", e)
            dispatch(callSnackBar("OOPS! Something went wrong", SNACK_BAR_VARIETNS.error))
        }
    }


}