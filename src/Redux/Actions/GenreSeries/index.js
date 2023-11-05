import { GENRE_SERIES } from "../../ActionTypes/GenreSeries"

export const getAllGenreSeries = (data) => {
    return {
        type: GENRE_SERIES.GET_GENRE_SERIES,
        payload: data
    }
}

export const updateSelectedGenreSeries = (data) => {
    return {
        type: GENRE_SERIES.UPDATE_GENRE_SERIES,
        payload: data
    }
}