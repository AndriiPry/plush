import { useMemo, useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import LoginPage from "./LoginPage";
import { signInAction } from "../../redux/actions/userReducerAction";
import useValidate from "../../hooks/useValidator";
import { jwtDecode } from "jwt-decode";


const LoginPageController = () => {
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const validate = useValidate();
    const navigate = useNavigate();


    // const handleGoogleLoginSuccess = (credentialResponse) => {
    //     const decoded = jwtDecode(credentialResponse.credential);
    //     console.log("decode", decoded);
    //     console.log(credentialResponse);
    //     navigate("/myaccount");
    //   };

    const [loading, setLoading] = useState(false);

    const defaultFormData = {
        identifier: "",
        password: "",
        err: "",
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

    const onSubmit = async (e) => {
        e.preventDefault();

        console.log("submit login")
        const validationResponse = validate(validationSchema);

        if (validationResponse === true) {
            setLoading(true);

            dispatch(signInAction(
                state,
                (err) => {
                    setState(prevState => ({ ...prevState, err }));
                    setLoading(false);
                },
                () => {
                    enqueueSnackbar('Signed in Successfully', { variant: "success" });
                    navigate('/myaccount');
                }
            ));
        } else {
            setState(prevState => ({ ...prevState, err: validationResponse }));
        }
    };

    return (
        <LoginPage
            state={state}
            setState={setState}
            onSubmit={onSubmit}
            loading={loading}
            // handleGoogleLoginSuccess={handleGoogleLoginSuccess}
        />
    );
};

export default LoginPageController;

