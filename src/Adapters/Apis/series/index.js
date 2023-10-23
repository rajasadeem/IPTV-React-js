import axios from "axios"
import { ADD_FILE, ADD_SERIES, BASE_URL, DELETE_SERIES, GET_SERIES } from "../../variables"
import { toast } from "react-toastify"


export const addNewFile = (token, payload, success, fail ) => async (dispatch) => {
    try{
        const response = await axios({
            method: "post",
            url: `${BASE_URL}${ADD_FILE}`,
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            },
            data: payload
        })
        if(response?.data?.status == 201) {
            success && success(response)
        }
    }
    catch (error) {
        fail && fail()
        return error
    }
}

export const addSeries = (token, payload, success, fail ) => async (dispatch) => {
    try{
        const response = await axios({
            method: "post",
            url: `${BASE_URL}${ADD_SERIES}`,
            headers: {
                "Content-Type": "Application/json",
                Authorization: `Bearer ${token}`
            },
            data: payload
        })
        if(response?.data?.status == 201) {
            success && success(response)
            toast.success("New Series Added")
        }
    }
    catch (error) {
        fail && fail()
        return error
    }
}

export const getAllSeries = (token, success, fail) => async (dispatch) => {
    try{
        const response = await axios({
            method: "get",
            url: `${BASE_URL}${GET_SERIES}`,
            headers: {
                "Content-Type": "Application/json",
                Authorization: `Bearer ${token}`
            },
        })
        if(response?.data?.status == 200) {
            success && success(response)
        }
    }
    catch (error) {
        fail && fail()
        return error
    }
}

export const deleteSeries = (token, id, success, fail) => async (dispatch) => {
    try{
        const response = await axios({
            method: "delete",
            url: `${BASE_URL}${DELETE_SERIES}/${id}`,
            headers: {
                "Content-Type": "Application/json",
                Authorization: `Bearer ${token}`
            },
        })
        if(response?.data?.status == 200) {
            success && success(response)
            toast.success("Series Deleted")
        }
    }
    catch (error) {
        fail && fail()
        return error
    }
}
