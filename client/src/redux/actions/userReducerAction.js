import { signInApi } from "../../api/auth.api"
import { actions } from "../../utils/constants"
import { logOut } from "../../utils/helper"
import { callApiAction } from "./commonAction"


export const signInAction = (data, onError,onSuccess) => {
    return async (dispatch, getState) => {
        dispatch(callApiAction(
            async () => await signInApi(data),
            (response) => {
                if(response?.user?.confirmed) {
                    dispatch({ type: actions.SIGN_IN, value: response })
                }
                onSuccess(response)
            },
            (err) => {
                
                onError(err)
            }
        ))
    }
}

export const signOutAction = () => {
    logOut()
    return {
        type: actions.SIGN_OUT,
    }
}
