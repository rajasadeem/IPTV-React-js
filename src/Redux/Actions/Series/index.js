import { SERIES } from "../../ActionTypes/Series"

export const addNewSeries = (data) => {
    return {
        type: SERIES.ADD_SERIES,
        payload: data
    }
}

export const getSeries = (data) => {
    return {
        type: SERIES.GET_SERIES,
        payload: data
    }
}

export const deleteSelectedSeries = (data) => {
    return {
        type: SERIES.DELETE_SERIES,
        payload: data
    }
}

export const updateSelectedSeries = (data) => {
    return {
        type: SERIES.UPDATE_SERIES,
        payload: data
    }
}

