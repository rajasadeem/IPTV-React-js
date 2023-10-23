import { useEffect, useRef, useState } from "react"
import useValidation from "../../Hooks/useValidation"
import useSetDataInBrowserStorage from "../../Hooks/useSetDataInBrowserStorage"
import { useDispatch, useSelector } from "react-redux"
import { addNewFile, addSeries, deleteSeries, getAllSeries } from "../../Adapters/Apis/series"
import { addNewSeries, deleteSelectedSeries, getSeries } from "../../Redux/Actions/Series"

const initialState = {
    name: "",
    description: "",
    trailer_id: "",
    thumbnail_id: ""
}
const useSeries = () => {
    const {
        seriesNameValidation,
        errors,
        setErrors,
        seriesDescriptionValidation
    } = useValidation()

    const dispatch = useDispatch()

    const [seriesId, setSeriesId] = useState("")
    const [deletePopup, setDeletePopup] = useState(false)

    const { getDataInCookies } = useSetDataInBrowserStorage()

    const [addLoader, setAddLoader] = useState(false)
    const [deleteLoader, setDeleteLoader] = useState(false)
    const [updateLoader, setUpdateLoader] = useState(false)
    const [getLoader, setGetLoader] = useState(false)

    const state = useSelector(state => state)
    const series = state?.series?.series

    const [addPopup, setAddPopup] = useState(false)
    const [seriesData, setSeriesData] = useState(initialState)
    const [thumbnail, setThumbnail] = useState("")
    const [file, setFile] = useState("")

    const displaySelectedImage = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const imageUrl = e.target.result;
            setThumbnail(imageUrl)
        };
        reader.readAsDataURL(file);
    };


    const addSeriesOnChangeHandler = (e) => {
        const { name, value } = e.target
        switch (name) {
            case 'name':
                seriesNameValidation(e)
                setSeriesData({
                    ...seriesData,
                    [name]: value
                })
                break;
            case 'description':
                seriesDescriptionValidation(e)
                setSeriesData({
                    ...seriesData,
                    [name]: value
                })
                break;
            case 'file':
                displaySelectedImage(e.target.files[0])
                setFile(e.target.files[0])
                break;
            default:
                setSeriesData({
                    ...seriesData,
                })
        }
    }

    const fileInputRef = useRef(null);
    const onCloseFile = () => {
        if (fileInputRef.current) {

            fileInputRef.current.value = '';
        }
        setThumbnail("")
    }
    const addNewSeriesHandler = () => {
        setAddLoader(true)
        const token = getDataInCookies("token")
        let success = (response) => {
            setAddLoader(false)
            const seriesSucces = (response) => {
                setAddLoader(false)
                dispatch(addNewSeries(response?.data?.data))
                setAddPopup(false)
                setSeriesData(initialState)
                onCloseFile()
            }
            const seriesFail = () => {
                setAddLoader(false)
            }
            const payload = {
                name: seriesData?.name,
                description: seriesData?.description,
                trailer_id: response?.data?.data?._id,
                thumbnail_id: response?.data?.data?._id,
            }
            dispatch(addSeries(token, payload, seriesSucces, seriesFail))
        }
        let fail = () => {
            setAddLoader(false)
        }
        const formData = new FormData()
        formData.append('file', file)
        dispatch(addNewFile(token, formData, success, fail))
    }

    const getAllSeriesHandler = () => {
        const token = getDataInCookies("token")
        let success = (response) => {
            dispatch(getSeries(response?.data?.data))
            setGetLoader(false)
        }
        let fail = () => {
            setGetLoader(false)
        }
        setGetLoader(true)
        dispatch(getAllSeries(token, success, fail))
    }
    useEffect(() => {
        getAllSeriesHandler()
    }, [])

    const deleteSeriesHandler = () => {
        const token = getDataInCookies("token")
        let success = (response) => {
            dispatch(deleteSelectedSeries({
                id: seriesId
            }))
            setDeleteLoader(false)
            setDeletePopup(false)
        }
        let fail = () => {
            setDeleteLoader(false)
            setDeletePopup(false)
        }
        setDeleteLoader(true)
        dispatch(deleteSeries(token, seriesId, success, fail))
    }


    return {
        addPopup,
        setAddPopup,
        addSeriesOnChangeHandler,
        errors,
        seriesData,
        thumbnail,
        setSeriesData,
        initialState,
        fileInputRef,
        onCloseFile,
        addNewSeriesHandler,
        series,
        deletePopup,
        setDeletePopup,
        setSeriesId,
        deleteSeriesHandler,
        deleteLoader,
        addLoader,
        getLoader
    }

}

export default useSeries