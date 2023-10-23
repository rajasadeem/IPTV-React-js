import { useDispatch, useSelector } from "react-redux";
import useSetDataInBrowserStorage from "../Hooks/useSetDataInBrowserStorage";
import Episode from "../Pages/Episodes";
import Genre from "../Pages/Genre/index";
import Home from "../Pages/Home";
import Login from "../Pages/OnBoarding/Login";
import Signup from "../Pages/OnBoarding/Signup";
import Season from "../Pages/Seasons";
import Series from "../Pages/Series";
import Streams from "../Pages/Streams";
import { userDetail } from "../Redux/Actions/User";
import { userData } from "../Adapters/Apis/User";
import { useEffect } from "react";
import { toast } from "react-toastify";

const useAuth = () => {

    const { getDataInCookies } = useSetDataInBrowserStorage()
    const dispatch = useDispatch()
    const state = useSelector(state => state)

    const user_data = state?.user?.user_detail
    const authValidated = getDataInCookies("token")

    const getUserDetail = () => {
        try {
            let auth = authValidated ? authValidated : null
            if (user_data || auth) {
                let success = (response) => {
                    dispatch(userDetail(response?.data?.data))
                }
                let fail = () => {
                    if (window.location.pathname != "/login")
                        window.location.href = '/login'
                }

                dispatch(userData(auth, success, fail))
            }
        }
        catch (error) {

        }
    }

    useEffect(() => {
        getUserDetail()
    }, [])

    return {
        authValidated
    }
}

export default useAuth

export const publicRoutes = [
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/signup",
        element: <Signup />
    }
]

export const privateRoutes = [
    {
        path: "/home",
        element: <Home />
    },
    {
        path: "/genre",
        element: <Genre />
    },
    {
        path: "/series",
        element: <Series />
    },
    {
        path: "/seasons",
        element: <Season />
    },
    {
        path: "/episodes",
        element: <Episode />
    },
    {
        path: "/streams",
        element: <Streams />
    },
]