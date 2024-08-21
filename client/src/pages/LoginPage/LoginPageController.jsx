import { useEffect, useMemo, useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import LoginPage from "./LoginPage";
import { signInAction } from "../../redux/actions/userReducerAction";
import useValidate from "../../hooks/useValidator";
import { callSnackBar } from "../../redux/actions/snackbarAction";
import { callApiAction } from "../../redux/actions/commonAction";
import { toTitleCase } from "../../utils/helper";
import { sendConfirmEmailApi } from "../../api/user.api";
import { actions, SNACK_BAR_VARIETNS } from "../../utils/constants";
import { jwtDecode } from "jwt-decode";


const LoginPageController = () => {
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const validate = useValidate();
    const navigate = useNavigate();


    const [loading, setLoading] = useState(false);

    const defaultFormData = {
        identifier: "",
        password: "",
        err: "",
        isEmailConfirmed : false,
        isResponse : false,
    }
    const [state, setState] = useState(defaultFormData)

    const validationSchema = useMemo(() => [
        {
            required: true,
            value: state.identifier,
            field: 'identifier',
        },
        {
            required: true,
            value: state.password,
            field: 'password',
        }
    ], [state]);


    
    useEffect(() => {
        if (state.isEmailConfirmed) {
            enqueueSnackbar('Signed in Successfully', { variant: "success" });
            navigate('/');
        } else if (state.err) {
            dispatch(callSnackBar(state.err, SNACK_BAR_VARIETNS.error));
        }
    }, [state.isEmailConfirmed, state.err]);

    const onSubmit = async (e) => {
        e.preventDefault();
        const validationResponse = validate(validationSchema);

        if (validationResponse === true) {
            setLoading(true);

            dispatch(signInAction(
                state,
                (err) => {
                    setState(prevState => ({ ...prevState, err }));
                    setLoading(false);
                },
                (res) => {
                    if (res?.user?.confirmed) {
                        setState(prevState => ({
                            ...prevState,
                            isEmailConfirmed: true, 
                        }));
                    } else {
                        setState(prevState => ({
                            ...prevState,
                            isResponse : true,
                            err: "Please verify your email to login"
                        }));
                    }
                }
            ));
        } else {
            setState(prevState => ({ ...prevState, err: validationResponse }));
        }
    };

    const sendVerificationMail = () => {
        const dataToBepassed = {
            email : state.identifier,
        }
        dispatch(
            callApiAction(
                async () =>  await sendConfirmEmailApi(dataToBepassed),
                (response) => {
                    dispatch(callSnackBar(toTitleCase("Please Verify your email"), SNACK_BAR_VARIETNS.suceess))
                    setState(prevState => ({
                        ...prevState,
                        isResponse : false,
                    }));
                },
                (err) => {
                }
            )
        )
    }
 

    //google log in
    const handleGoogleLoginSuccess = async (credentialResponse) => {
        
        try {
            const decoded = jwtDecode(credentialResponse.credential);  
            const { email } = decoded; // Extract email from decoded token
            
            setLoading(true);
    
            // Dispatch the sign-in action
            dispatch(signInAction(
                {
                    identifier: email,
                    password: credentialResponse.credential,
                },
                (err) => {
                    setState(prevState => ({ ...prevState, err }));
                    setLoading(false);
                },
                (response) => {
                    dispatch({
                        type: actions.SET_USER, 
                        value: response,
                    });
    
                    enqueueSnackbar('Signed in Successfully', { variant: "success" });
                    navigate('/myaccount');
                }
            ));
    
        } catch (error) {
            console.error("Error handling Google sign-in:", error);
            dispatch(callSnackBar("Failed to sign in with Google", SNACK_BAR_VARIETNS.error));
            setLoading(false);
        }
    };
    
    
    
    return (
        <LoginPage
            state={state}
            setState={setState}
            onSubmit={onSubmit}
            loading={loading}
            sendVerificationMail={sendVerificationMail}
            handleGoogleLoginSuccess={handleGoogleLoginSuccess}
        />
    );
};

export default LoginPageController;
