import { EPISODES } from "../../ActionTypes/Episodes"

export const getEpisodes = (data) => {
    return {
        type: EPISODES.GET_EPISODES,
        payload: data
    }
}
export const addEpisodes = (data) => {
    return {
        type: EPISODES.ADD_EPISODES,
        payload: data
    }
}
export const deleteEpisodes = (data) => {
    return {
        type: EPISODES.DELETE_EPISODES,
        payload: data
    }
}
export const updateEpisodes = (data) => {
    return {
        type: EPISODES.UPDATE_EPISODES,
        payload: data
    }
}