import { GENRE } from "../../ActionTypes/Genre"

export const getAllGenres = (data) => {
    return {
        type: GENRE.GET_GENRE,
        payload: data
    }
}

export const updateGenreByItsID = (data) => {
    return {
        type: GENRE.UPDATE_GENRE,
        payload: data
    }
}

export const deleteGenreById = (data) => {
    return {
        type: GENRE.DELETE_GENRE,
        payload: data
    }
}

export const addNewGenre = (data) => {
    return {
        type: GENRE.ADD_GENRE,
        payload: data
    }
}