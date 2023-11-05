import axios from "axios"
import { ADD_SEASON, BASE_URL, DELETE_SEASON, GET_SEASONS, UPDATE_SEASON } from "../../variables"
import { toast } from "react-toastify"

export const getSeasons = (token, success, fail) =>  async(dispatch) => {
    try{
        const response = await axios({
            method: "get",
            url: `${BASE_URL}${GET_SEASONS}`,
            headers: {
                "Content-Type":"Application/json",
                Authorization: `Bearer ${token}`
            }
        })
        if(response?.data?.status == 200){
            success && success(response)
        }
    }
    catch (error) {
        fail && fail()
        return error

    }
}
export const addSeason = (token, payload, success, fail) =>  async(dispatch) => {
    try{
        const response = await axios({
            method: "post",
            url: `${BASE_URL}${ADD_SEASON}`,
            headers: {
                "Content-Type":"Application/json",
                Authorization: `Bearer ${token}`
            },
            data: payload
        })
        if(response?.data?.status == 201){
            success && success(response)
            toast.success("New Season Added")
        }
    }
    catch (error) {
        fail && fail()
        return error
    }
}
export const deleteSelectedSeason = (token, id, success, fail) => async (dispatch) => {
    try {
        const response = await axios({
            method:"delete",
            url: `${BASE_URL}${DELETE_SEASON}${id}`,
            headers : {
                "Content-Type": "Application/json",
                Authorization: `Bearer ${token}`
            }
        })
        if(response?.data?.status == 200) {
            success && success(response)
            toast.success("Season Deleted")
        }

    }
    catch (error){
        fail && fail()
        return error
    }
}

export const updateSelectedSeason = (token, id, payload, success, fail) => async(dispatch) => {
    try{
        const response = await axios({
            method: "patch",
            url: `${BASE_URL}${UPDATE_SEASON}${id}`,
            headers: {
                "Content-Type":"Application/json",
                Authorization: `Bearer ${token}`
            },
            data: payload
        })
        if(response?.data?.status == 201){
            console.log(response);
            success && success(response)
            toast.success("Season Updated")
        }
    }
    catch (error){
        fail && fail()
        return error
    }
}

export const getSeasonsBySeriesId = (token, id, success, fail) => async(dispach) => {
    try{
        const response = await axios({
            method: "get",
            url: `${BASE_URL}series/${id}/seasons`,
            headers: {
                "Content-Type": "Application/json",
                Authorization: `Bearer ${token}`
            }
        })
        if(response?.data?.status == 200) {
            success && success(response)
        }
    }
    catch (error){
        fail && fail()
        return error
    }
}