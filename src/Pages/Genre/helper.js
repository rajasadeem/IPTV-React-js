import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import useSetDataInBrowserStorage from "../../Hooks/useSetDataInBrowserStorage"
import { addGenre, deleteGenre, getGenre, updateGenre } from "../../Adapters/Apis/Genre"
import { addNewGenre, deleteGenreById, getAllGenres, updateGenreByItsID } from "../../Redux/Actions/Genre"

const useGenre = () => {
    const dispatch = useDispatch()
    const { getDataInCookies } = useSetDataInBrowserStorage()
    const [loading, setLoading] = useState(false)
    const [updateLoader, setUpdateLoader] = useState(false)
    const [deleteLoader, setDeleteLoader] = useState(false)
    const [addLoader, setAddLoader] = useState(false)

    const [genreId, setGenreId] = useState("")
    const [genreName, setGenreName] = useState("")

    const [updatePopup, setUpdatePopup] = useState(false)
    const [deletePopup, setDeletePopup] = useState(false)
    const [addPopup, setAddPopup] = useState(false)

    const state = useSelector(state => state)
    let genres = state?.genre?.genres

    const [getGenres, setGetGenres] = useState(false)

    const getALLGenre = () => {
        let token = getDataInCookies("token")
        let succes = (response) => {
            setLoading(false)
            dispatch(getAllGenres(response?.data?.data))
        }
        let fail = () => {
            setLoading(false)
        }
        setLoading(true)
        dispatch(getGenre(token, succes, fail))
    }

    useEffect(() => {
        getALLGenre()
    }, [])

    const onUpdateGenreHandler = () => {
        let token = getDataInCookies("token")
        let succes = (response) => {
            setUpdateLoader(false)
            dispatch(updateGenreByItsID(response?.data?.data))
            setUpdatePopup(false)
        }
        let fail = () => {
            setUpdateLoader(false)
            setUpdatePopup(false)
        }
        setUpdateLoader(true)
        const payload = {
            name: genreName
        }
        dispatch(updateGenre(genreId, payload, token, succes, fail))
    }

    const onDeleteGenreHandler = () => {
        const token = getDataInCookies("token")
        let success = (response) => {
            setDeleteLoader(false)
            const data = {
                id: genreId
            }
            dispatch(deleteGenreById(data))
            setDeletePopup(false)
        }
        let fail = () => {
            setDeleteLoader(false)
            setDeletePopup(false)
        }
        setDeleteLoader(true)
        dispatch(deleteGenre(genreId, token, success, fail))
    }

    const addNewGenreHandler = () => {
        const token = getDataInCookies("token")
        let success = (response) => {
            setAddLoader(false)
            dispatch(addNewGenre(response?.data?.data))
            setAddPopup(false)
        }
        let fail = () => {
            setAddLoader(false)
            setAddPopup(false)
        }
        setAddLoader(true)
        const payload = {
            name: genreName
        }
        dispatch(addGenre(payload, token, success, fail))
    }


    return {
        loading,
        state,
        genres,
        setGenreId,
        setGenreName,
        genreName,
        onUpdateGenreHandler,
        updateLoader,
        updatePopup,
        setUpdatePopup,
        onDeleteGenreHandler,
        deleteLoader,
        deletePopup,
        setDeletePopup,
        addPopup,
        setAddPopup,
        addLoader,
        addNewGenreHandler
    }

}

export default useGenre