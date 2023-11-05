import axios from "axios";
import { ADD_NEW_GENRE, BASE_URL, DELETE_GENRE, GENRE, UPDATE_GENRE } from "../../variables";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export const getGenre =  ( token, success, fail ) => async (dispatch) => {
    try{
        let headers = {
            "Content-type": "application/json",
            headers: { Authorization: `Bearer ${token}` },
          };
        const response = await axios.get(`${BASE_URL}${GENRE}`, headers)
        if(response?.data?.status == 401) {
            window.location.href = `${process.env.PUBLIC_URL}/login`
        }
        if (response?.data?.status == 404) {
            toast.error(response?.data?.message);
            fail && fail();
          }
        if(response?.data?.status == 200){
            success && success(response)
            return response;
        }
    }
    catch (error) {
        fail && fail()
        return error
    }
}

export const updateGenre =  ( id, data ,token, success, fail ) => async (dispatch) => {
    try{
        const response = await axios({
            url: `${BASE_URL}${UPDATE_GENRE}${id}`,
            method: "patch",
            headers: {
                "Content-Type": "Application/json",
                Authorization: `Bearer ${token}`
            },
            data
        })
        if (response?.data?.status == 405) {
            toast.error(response?.data?.message);
            fail && fail();
          }
        if(response?.data?.status == 200){
            success && success(response)
            toast.success("Genre Updated Successfully")
            return response;
        }
    }
    catch (error) {
        fail && fail()
        return error
    }
}

export const deleteGenre =  ( id , token, success, fail ) => async (dispatch) => {
    try{
        const response = await axios({
            url: `${BASE_URL}${DELETE_GENRE}${id}`,
            method: "delete",
            headers: {
                "Content-Type": "Application/json",
                Authorization: `Bearer ${token}`
            },
        })
        if(response?.data?.status == 200){
            success && success(response)
            toast.success("Genre Deleted Successfully")
            return response;
        }
    }
    catch (error) {
        fail && fail()
        return error
    }
}

export const addGenre =  (data ,token, success, fail ) => async (dispatch) => {
    try{
        const response = await axios({
            url: `${BASE_URL}${ADD_NEW_GENRE}`,
            method: "post",
            headers: {
                "Content-Type": "Application/json",
                Authorization: `Bearer ${token}`
            },
            data
        })
        if (response?.data?.status == 405) {
            toast.error(response?.data?.message);
            fail && fail();
          }
        if(response?.data?.status == 201){
            success && success(response)
            toast.success("Genre Added Successfully")
            return response;
        }
    }
    catch (error) {
        fail && fail()
        return error
    }
}