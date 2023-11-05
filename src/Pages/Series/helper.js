import { useEffect, useRef, useState } from "react"
import useValidation from "../../Hooks/useValidation"
import useSetDataInBrowserStorage from "../../Hooks/useSetDataInBrowserStorage"
import { useDispatch, useSelector } from "react-redux"
import { addGenreSeries, addNewFile, addSeries, deleteSeries, getAllSeries, getGenreSeries, getSeriesByGenreId, updateFile, updateGenreSeries, updateSeries } from "../../Adapters/Apis/series"
import { addNewSeries, deleteSelectedSeries, getSeries, updateSelectedSeries } from "../../Redux/Actions/Series"
import { getAllGenres } from "../../Redux/Actions/Genre"
import { getGenre } from "../../Adapters/Apis/Genre"
import { useNavigate } from "react-router-dom"
import { getAllGenreSeries } from "../../Redux/Actions/GenreSeries"

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
    const navigate = useNavigate()

    const [seriesId, setSeriesId] = useState("")
    const [deletePopup, setDeletePopup] = useState(false)
    const [updatePopup, setUpdatePopup] = useState(false)

    const { getDataInCookies, storeDataInLocalStorage } = useSetDataInBrowserStorage()

    const [updatedGenreSeries, setUpdatedGenreSeries] = useState(false)

    const [addLoader, setAddLoader] = useState(false)
    const [deleteLoader, setDeleteLoader] = useState(false)
    const [updateLoader, setUpdateLoader] = useState(false)
    const [getLoader, setGetLoader] = useState(false)

    const [fileId, setFileId] = useState("")
    const [genreSeriesId, setGenreSeriesId] = useState("")

    const state = useSelector(state => state)
    const series = state?.series?.series
    const genre = state?.genre?.genres
    const genreSeries = state?.genreSeries?.genreSeries
    const option = genre.map(item => {
        return {
            value: item?._id,
            label: item?.name
        }
    })
    const [genreId, setGenreId] = useState("")
    const onChangeDropDown = (item) => {
        setGenreId(item?.value)
        setGenreValue({
            value: item?.value,
            label: item?.label
        })
    }

    const [addPopup, setAddPopup] = useState(false)
    const [seriesData, setSeriesData] = useState(initialState)
    const [thumbnail, setThumbnail] = useState("")
    const [file, setFile] = useState("")


    const getALLGenre = () => {
        let token = getDataInCookies("token")
        let succes = (response) => {
            dispatch(getAllGenres(response?.data?.data))
        }
        let fail = () => {
        }
        dispatch(getGenre(token, succes, fail))
    }

    useEffect(() => {
        if (genre?.length == 0) {
            getALLGenre()
        }
    }, [])

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
            const seriesSucces = (response) => {
                dispatch(addNewSeries(response?.data?.data))
                let genreSeriesSuccess = (response) => {
                    setAddLoader(false)
                    setUpdatedGenreSeries(!updatedGenreSeries)
                    setSeriesData(initialState)
                    onCloseFile()
                    setAddPopup(false)
                }
                let genreSeriesfail = () => {
                    setAddLoader(false)
                    setAddPopup(false)
                }
                const payload = {
                    genre_id: genreId,
                    series_id: response?.data?.data?._id
                }
                dispatch(addGenreSeries(token, payload, genreSeriesSuccess, genreSeriesfail))
            }
            const seriesFail = () => {
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
        }
        const formData = new FormData()
        formData.append('file', file)
        dispatch(addNewFile(token, formData, success, fail))
    }

    const token = getDataInCookies("token")
    const updateSeriesHandler = () => {
        if (file) {
            setUpdateLoader(true)
            let success = (response) => {
                let seriesSucces = (response) => {
                    dispatch(updateSelectedSeries(response?.data?.data))
                    let genreSeriesSuccess = (response) => {
                        setUpdateLoader(false)
                        setUpdatedGenreSeries(!updatedGenreSeries)
                        setSeriesData(initialState)
                        onCloseFile()
                        setUpdatePopup(false)
                    }
                    let genreSeriesfail = () => { }
                    const payload = {
                        genre_id: genreId,
                    }
                    dispatch(updateGenreSeries(token, genreSeriesId, payload, genreSeriesSuccess, genreSeriesfail))
                }
                let seriesFail = () => { }
                const payload = {
                    name: seriesData?.name,
                    description: seriesData?.description,
                    trailer_id: response?.data?.data?._id,
                    thumbnail_id: response?.data?.data?._id,
                }
                dispatch(updateSeries(token, seriesId, payload, seriesSucces, seriesFail))

            }
            let fail = () => { }
            const formdata = new FormData()
            formdata.append('file', file)
            dispatch(updateFile(token, fileId, formdata, success, fail))
        }
        else if (!file && seriesData?.name || seriesData?.description) {
            setUpdateLoader(true)
            let seriesSucces = (response) => {
                dispatch(updateSelectedSeries(response?.data?.data))
                let genreSeriesSuccess = (response) => {
                    setUpdateLoader(false)
                    setUpdatedGenreSeries(!updatedGenreSeries)
                    setSeriesData(initialState)
                    onCloseFile()
                    setUpdatePopup(false)
                }
                let genreSeriesfail = () => { }
                const payload = {
                    genre_id: genreId,
                }
                dispatch(updateGenreSeries(token, genreSeriesId, payload, genreSeriesSuccess, genreSeriesfail))
            }
            let seriesFail = () => { }
            if (seriesData?.name) {
                const payload = {
                    name: seriesData?.name,
                }
                dispatch(updateSeries(token, seriesId, payload, seriesSucces, seriesFail))
            } else if (seriesData?.description) {
                const payload = {
                    name: seriesData?.name,
                }
                dispatch(updateSeries(token, seriesId, payload, seriesSucces, seriesFail))
            }
            else if (seriesData?.name && seriesData?.description) {
                const payload = {
                    name: seriesData?.name,
                    description: seriesData?.description
                }
                dispatch(updateSeries(token, seriesId, payload, seriesSucces, seriesFail))
            }
        }
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
    const [clearFilter, setClearFilter] = useState(false)
    useEffect(() => {
        getAllSeriesHandler()
    }, [clearFilter])

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

    const getGenreSeriesHandler = () => {
        const token = getDataInCookies("token")
        let success = (response) => {
            dispatch(getAllGenreSeries(response?.data?.data))
        }
        let fail = () => { }
        dispatch(getGenreSeries(token, success, fail))
    }
    useEffect(() => {
        getGenreSeriesHandler()
    }, [updatedGenreSeries])

    const setGenreNameHandler = (e) => {
        const item = genreSeries?.filter(ele => e?._id == ele?.series_id?._id)
        return item
    }
    const [genreValue, setGenreValue] = useState("")
    const genreSeriesIdHandler = (e) => {
        const item = genreSeries?.filter(ele => e?._id == ele?.series_id?._id)
        setGenreSeriesId(item[0]?._id)
        const ele = genre?.filter(e => e?._id == item[0]?.genre_id?._id)
        setGenreValue({
            label: ele[0]?.name,
            value: ele[0]?._id
        })
        setGenreId(ele[0]?._id)
    }

    const [genreFilter, setGenreFilter] = useState("")
    const [filterValue, setFilterValue] = useState("")
    const filterOnChange = (e) => {
        setGenreFilter(e?.value)
        setFilterValue({
            value: e?.value,
            label: e?.label
        })
    }
    const filterSeriesHandler = () => {
        let success = (response) => {
            dispatch(getSeries(response?.data?.data[0]?.Series))
            setGetLoader(false)
        }
        let fail = () => {
            setGetLoader(false)
        }
        setGetLoader(true)
        dispatch(getSeriesByGenreId(token, genreFilter, success, fail))
    }
    useEffect(() => {
        if(genreFilter){
            filterSeriesHandler()
        }
    },[genreFilter])

    const seriesOnClick = (e) => {
        // navigate(`/seasons?id=${seriesId}&name=${seriesData?.name}`)
        // alert("OnCLick")
        // storeDataInLocalStorage("seriesId",)
    }


    return {
        addPopup,
        setAddPopup,
        addSeriesOnChangeHandler,
        errors,
        seriesData,
        thumbnail,
        setThumbnail,
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
        getLoader,
        updatePopup,
        setUpdatePopup,
        genre,
        option,
        onChangeDropDown,
        genreSeries,
        setFileId,
        updateSeriesHandler, updateLoader, setFile, setGenreId, genreId, setGenreNameHandler,
        genreSeriesIdHandler, genreValue, filterOnChange, clearFilter, setClearFilter, setFilterValue, filterValue,
        seriesOnClick, storeDataInLocalStorage, navigate
    }

}

export default useSeries