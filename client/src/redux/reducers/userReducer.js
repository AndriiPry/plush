// import { actions } from "../../utils/constants";
// import { accessToken, refreshToken } from "../../utils/helper";


// const initialState = {
//     data: {},
   
//     isLoggedIn: false,

// }

// const userReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case actions.SET_USER: 
//             return { ...state, data: action.value, isLoggedIn: true };
//         case actions.SIGN_IN: 
//             accessToken.set(action.value.accessToken);
//             refreshToken.set(action.value.refreshToken);
//             return { ...state, data: action.value, isLoggedIn: true };
//         case actions.SIGN_OUT: 
//             accessToken.remove(); 
//             refreshToken.remove(); 
//             return { ...state, data: {}, isLoggedIn: false };
//         default: 
//             return state;
//     }
// }

// export default userReducer

// reducers/userReducer.js
import { actions } from "../../utils/constants";
import { accessToken, refreshToken } from "../../utils/helper";

const initialState = {
    data: {},
    isLoggedIn: false,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.SET_USER:
            return { ...state, data: action.value, isLoggedIn: true };
        case actions.SIGN_IN:
            accessToken.set(action.value.accessToken);
            refreshToken.set(action.value.refreshToken);
            return { ...state, data: action.value, isLoggedIn: true };
        case actions.SIGN_OUT:
            accessToken.remove();
            refreshToken.remove();
            return { ...state, data: {}, isLoggedIn: false };
        default:
            return state;
    }
};

export default userReducer;
