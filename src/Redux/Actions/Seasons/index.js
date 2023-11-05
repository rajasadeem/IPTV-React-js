import { SEASONS } from "../../ActionTypes/Seasons"

export const getAllSeasons = (data) => {
    return {
        type: SEASONS.GET_ALL_SEASONS,
        payload: data
    }
}
export const addNewSeason = (data) => {
    return {
        type: SEASONS.ADD_SEASON,
        payload: data
    }
}
export const updateSeason = (data) => {
    return {
        type: SEASONS.UPDATE_SEASONS,
        payload: data
    }
}
export const deleteSeason = (data) => {
    return {
        type: SEASONS.DELETE_SEASON,
        payload: data
    }
}
