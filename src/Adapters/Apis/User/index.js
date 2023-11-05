import axios from "axios";
import { BASE_URL, LOGIN, SIGN_UP, USER_DATA } from "../../variables";
import { toast } from "react-toastify";

export const signUp = (data, success, fail) => async (dispatch) => {
    try {
        const response = await axios.post(`${BASE_URL}${SIGN_UP}`, data)
        if (response?.data?.status == 404) {
            toast.error(response?.data?.message);
            fail && fail();
        }
        if (response?.data?.status == 201) {
            toast.success("User registered successfully")
            console.log(response?.data);
            success && success()
            return response;
        }
    }
    catch (error) {
        fail && fail()
        return error
    }
}

export const login = (data, success, fail) => async (dispatch) => {
    try {
        const response = await axios.post(`${BASE_URL}${LOGIN}`, data)
        if (response?.data?.status == 404) {
            toast.error(response?.data?.message);
            fail && fail();
        }
        if (response?.data?.status == 200) {
            toast.success("User login successfully")
            success && success(response)
            return response;
        }
    }
    catch (error) {
        fail && fail()
        return error
    }
}

export const userData = (token, success, fail) => async (dispatch) => {
    try {
        const response = await axios({
            method: "get",
            url: `${BASE_URL}${USER_DATA}`,
            headers: {
                "Content-Type": "Application/json",
                Authorization: `Bearer ${token}`
            }
        })
        if (response?.data?.status == 200) {
            success && success(response)
        }
        if(response?.data?.status == 401) {
            fail && fail(response)
        }
    }
    catch (error) {
        fail && fail()
        return error
    }
}