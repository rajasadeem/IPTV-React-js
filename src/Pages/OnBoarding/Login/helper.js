import { useState } from "react"
import useValidation from "../../../Hooks/useValidation"
import useSetDataInBrowserStorage from "../../../Hooks/useSetDataInBrowserStorage"
import { userDetail } from "../../../Redux/Actions/User"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { login } from "../../../Adapters/Apis/User"

const initialState = {
    email: "",
    password: ""
}
const useLogin = () => {

    const [loginData, setLoginData] = useState(initialState)

    const {
        emailValidation,
        passwordValidation,
        errors,
        setErrors,
    } = useValidation()

    const { setDataInCookies } = useSetDataInBrowserStorage()

    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    let disbledValidation =
        Object.values(loginData).every((x) => x !== "") && Object.values(errors).every((x) => x === "") ? false : true;

    const onChangeHandler = (e) => {
        const { name, value } = e.target

        switch (name) {
            case 'email':
                emailValidation(e)
                setLoginData({
                    ...loginData,
                    [name]: value
                })
                break;
            case 'password':
                passwordValidation(e)
                setLoginData({
                    ...loginData,
                    [name]: value
                })
                break;
            default:
                setLoginData({
                    ...loginData
                })
        }
    }
    const onSubmit = () => {
        const payload = {
            email: loginData.email,
            password: loginData.password
        }
        let success = (response) => {
            setLoading(false)
            let token = response?.data?.data?.token
            setDataInCookies("token", token)
            dispatch(userDetail(response?.data?.data?.data))
            navigate("/home")
        }
        let fail = () => {
            setLoading(false)
        }
        setLoading(true)
        dispatch(login(payload, success, fail))
    }

    return {
        onChangeHandler,
        onSubmit,
        loading,
        errors,
        disbledValidation,
        loginData,
    }
}



export default useLogin