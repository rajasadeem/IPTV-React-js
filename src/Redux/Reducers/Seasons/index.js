import { SEASONS } from "../../ActionTypes/Seasons"

const initialState = {
    seasons: []
}
const update = (payload, data) => {
    return data?.map((item) => {
        if (item?._id == payload?._id) {
            return payload;
        }
        else {
            return item;
        }
    })
}

const filter = (payload, data) => {
    return data?.filter(item => item?._id !== payload?.id)
}

const add = (payload, data) => {
    return [...data, payload]
}

const seasonsReducer = (state = initialState, action) => {
    const {type, payload} = action
    const { seasons } = state

    switch (type) {
        case SEASONS.GET_ALL_SEASONS:
            return {
                ...state,
                seasons: payload
            }
        case SEASONS.ADD_SEASON:
            return {
                ...state,
                seasons: add(payload, seasons)
            }
        case SEASONS.UPDATE_SEASONS:
            return {
                ...state,
                seasons: update(payload, seasons)
            }
        case SEASONS.DELETE_SEASON:
            return {
                ...state,
                seasons: filter(payload, seasons)
            }
        default:
            return {
                ...state
            }
    }
}

export default seasonsReducer