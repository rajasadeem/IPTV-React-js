import React, { useState } from "react";
import useValidation from "../../../Hooks/useValidation";
import { useDispatch } from "react-redux";
import { signUp } from "../../../Adapters/Apis/User";
import { useNavigate } from "react-router-dom";

const initalState = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
}
const useSignup = () => {
    const { nameValidation,
        emailValidation,
        passwordValidation,
        errors,
        setErrors,
    } = useValidation()

    const [signupData, setSignupData] = useState(initalState)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    let disbledValidation =
        Object.values(signupData).every((x) => x !== "") && Object.values(errors).every((x) => x === "") ? false : true;

    const onChangeHandler = (e) => {
        const { name, value } = e.target

        switch (name) {
            case 'first_name':
                nameValidation(e)
                setSignupData({
                    ...signupData,
                    [name]: value
                })
                break;
            case 'last_name':
                nameValidation(e)
                setSignupData({
                    ...signupData,
                    [name]: value
                })
                break;
            case 'email':
                emailValidation(e)
                setSignupData({
                    ...signupData,
                    [name]: value
                })
                break;
            case 'password':
                passwordValidation(e)
                setSignupData({
                    ...signupData,
                    [name]: value
                })
                break;
            default:
                setSignupData({
                    ...signupData,
                    [name]: value
                })
        }
    }

    const onSubmit = () => {
        const payload = {
            first_name: signupData.first_name,
            last_name: signupData.last_name,
            email: signupData.email,
            password: signupData.password
        }
        let success = () => {
            setLoading(false)
            navigate("/login")
        }
        let fail = () => {
            setLoading(false)
        }
        setLoading(true)
        dispatch(signUp(payload, success, fail))
    }

    return {
        onChangeHandler,
        signupData,
        errors,
        onSubmit,
        disbledValidation,
        loading
    }

}

export default useSignup
