import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import useSetDataInBrowserStorage from "../../Hooks/useSetDataInBrowserStorage"
import { addSeason, deleteSelectedSeason, getSeasons, getSeasonsBySeriesId, updateSelectedSeason } from "../../Adapters/Apis/Season"
import { getAllSeries } from "../../Adapters/Apis/series"
import { getSeries } from "../../Redux/Actions/Series"
import useValidation from "../../Hooks/useValidation"
import { addNewSeason, deleteSeason, getAllSeasons, updateSeason } from "../../Redux/Actions/Seasons"
import { toast } from "react-toastify"
import { useSearchParams } from "react-router-dom"

const initialState = {
    name: "",
    description: ""
}

const useSeasons = () => {
    const { getDataInCookies } = useSetDataInBrowserStorage()
    const { seriesNameValidation, seriesDescriptionValidation, errors, setErrors } = useValidation()
    const token = getDataInCookies("token")
    const dispatch = useDispatch()

    const [searchParam, setSearchParam] = useSearchParams()
    const series_id = searchParam.get("id")
    const removeQueryParams = (key) => {
        const updatedSearchParams = new URLSearchParams(searchParam);
        updatedSearchParams.delete(key);
        setSearchParam(updatedSearchParams.toString());
    }

    const [seasonData, setSeasonData] = useState(initialState)
    const state = useSelector(state => state)
    const seasons = state?.seasons?.seasons
    const series = state?.series?.series

    const [seriesId, setSeriesId] = useState("")
    const [seasonId, setSeasonId] = useState("")

    const options = series?.map(item => {
        return {
            value: item?._id,
            label: item?.name
        }
    })

    const [addPopup, setAddPopup] = useState(false)
    const [deletePopup, setDeletePopup] = useState(false)
    const [updatePopup, setUpdatePopup] = useState(false)

    const [seriesValue, setSeriesValue] = useState("")
    const setSeriesValueHandler = (e) => {
        setSeriesValue({
            value: e?.series_id?._id,
            label: e?.series_id?.name
        })
        setSeriesId(e?.series_id?._id)
    }

    const [loader, setLoader] = useState(false)

    const onClose = () => {
        setSeasonData(initialState)
    }
    const getAllSeriesHandler = () => {
        let success = (response) => {
            dispatch(getSeries(response?.data?.data))
        }
        let fail = () => {
        }
        dispatch(getAllSeries(token, success, fail))
    }
    useEffect(() => {
        if (series?.length == 0) {
            getAllSeriesHandler()
        }
    }, [])

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
    const getSeasonsBySeriesIdHandler = () => {
        let success = (response) => {
            dispatch(getAllSeasons(response?.data?.data))
            setLoader(false)
        }
        let fail = () => {
            setLoader(false)
        }
        dispatch(getSeasonsBySeriesId(token, series_id, success, fail))
    }
    useEffect(() => {
        if (series_id) {
            getSeasonsBySeriesIdHandler()
        }
        else {
            getAllSeasonsHandler()
        }
    }, [])

    const onChangeDropDown = (item) => {
        setSeriesId(item?.value)
        setSeriesValue({
            value: item?.value,
            label: item?.label,
        })
    }
    const addSeasonOnChangeHandler = (e) => {
        const { name, value } = e.target
        switch (name) {
            case 'name':
                seriesNameValidation(e)
                setSeasonData({
                    ...seasonData,
                    [name]: value
                })
                break;
            case 'description':
                seriesDescriptionValidation(e)
                setSeasonData({
                    ...seasonData,
                    [name]: value
                })
                break;
            default:
                setSeasonData({
                    ...seasonData
                })
        }
    }
    const addSeasonHandler = () => {
        let success = (response) => {
            dispatch(addNewSeason(response?.data?.data))
            setAddPopup(false)
            setSeasonData(initialState)
        }
        let fail = () => {
            setAddPopup(false)
            setSeasonData(initialState)
        }
        const payload = {
            name: seasonData?.name,
            description: seasonData?.description,
            series_id: seriesId
        }
        dispatch(addSeason(token, payload, success, fail))
    }

    const deleteSeasonHandler = () => {
        let success = (response) => {
            dispatch(deleteSeason({
                id: seasonId
            }))
            setDeletePopup(false)
        }
        let fail = () => {
            setDeletePopup(false)
        }
        dispatch(deleteSelectedSeason(token, seasonId, success, fail))
    }

    const updateSeasonHandler = () => {
        let success = (response) => {
            dispatch(updateSeason(response?.data?.data))
            setUpdatePopup(false)
            setSeasonData(initialState)
        }
        let fail = () => {
            setUpdatePopup(false)
            setSeasonData(initialState)
        }
        const payload = {
            name: seasonData?.name,
            description: seasonData?.description,
            series_id: seriesId
        }
        dispatch(updateSelectedSeason(token, seasonId, payload, success, fail))
    }



    return {
        getAllSeasonsHandler, loader, seasons, addPopup, setAddPopup, options, onChangeDropDown, addSeasonOnChangeHandler, seasonData, setSeasonData, errors, onClose, addSeasonHandler, deletePopup,
        updatePopup, setDeletePopup, setUpdatePopup, setSeasonId, deleteSeasonHandler, setSeriesValueHandler, seriesValue, updateSeasonHandler, series_id, searchParam, removeQueryParams
    }
}

export default useSeasons