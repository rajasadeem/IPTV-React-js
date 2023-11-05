import { useDispatch, useSelector } from "react-redux"
import useSetDataInBrowserStorage from "../../Hooks/useSetDataInBrowserStorage"
import { useEffect, useState } from "react"
import { getEpisodes } from "../../Redux/Actions/Episodes"
import { getAllEpisodes } from "../../Adapters/Apis/Episodes"
import { getAllSeasons } from "../../Redux/Actions/Seasons"
import { getSeasons } from "../../Adapters/Apis/Season"

const useEpisode = () => {
    const { getDataInCookies } = useSetDataInBrowserStorage()
    const token = getDataInCookies("token")

    const dispatch = useDispatch()
    const state = useSelector(state => state)
    // console.log(state);
    const seasons = state?.seasons?.seasons

    const [ loader, setLoader] = useState(false)
    const [ addPopup, setAddPopup ] = useState(false)
    const [ deletePopup, setDeletePopup ] = useState(false)
    const [ updatePopup, setUpdatePopup ] = useState(false)

    const options = seasons?.map(item => {
        return {
            value: item?._id,
            label: item?.name
        }
    })

    const getAllSeasonsHandler = () => {
        let success = (response) => {
            dispatch(getAllSeasons(response?.data?.data))
            setLoader(false)
        }
        let fail = () => {
            setLoader(false)
        }
        setLoader(true)
        dispatch(getSeasons(token, success, fail))
    }
    useEffect(() => {
        if(seasons?.length == 0){
            getAllSeasonsHandler()
        }
    },[])
    
    const getAllEpisodesHandler = () => {
        let success = (response) => {
           dispatch(getEpisodes(response?.data?.data))
           setLoader(false)
        }
        let fail = () => {
            setLoader(false)
        }
        setLoader(true)
        dispatch(getAllEpisodes(token, success, fail))
    }


    return {
        options, setAddPopup,  addPopup, setDeletePopup, deletePopup, setUpdatePopup, updatePopup,

    }

}

export default useEpisode