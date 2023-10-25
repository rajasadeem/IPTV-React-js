import axios from "axios"
import { ADD_EPISODE, BASE_URL, GET_EPISODES } from "../../variables"
import { toast } from "react-toastify"

export const getAllEpisodes = (token, success, fail) => async(dispatch) => {
    try{
        const response = await axios({
            method: "get",
            url: `${BASE_URL}${GET_EPISODES}`,
            headers: {
                "Content-Type": "Application/json",
                Authorization: `Bearer ${token}`
            }
        })
        if(response?.data?.status == 200){
            success && success(response)
        }
    }
    catch (error){
        fail && fail()
    }
}
export const addNewEpisode = ( token, payload, success, fail) => async(dispatch) => {
    try{
        const response = await axios({
            method: "post",
            url: `${BASE_URL}${ADD_EPISODE}`,
            headers: {
                "Content-Type": "Application/json",
                Authorization: `Bearer ${token}`
            },
            data: payload
        })
        if(response?.data?.status == 201){
            success && success(response)
            toast.success("New Episode Added")
        }
    }
    catch (error){
        fail && fail()
    }
}