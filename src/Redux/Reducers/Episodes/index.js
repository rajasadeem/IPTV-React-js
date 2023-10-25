import { EPISODES } from "../../ActionTypes/Episodes"

const initialState = {
    episodes: []
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

const episoderReducer = (state = initialState, action) => {
    const { type, payload } = action
    const { episodes } = state

    switch (type) {
        case EPISODES.GET_EPISODES:
            return {
                ...state,
                episodes: payload
            }
        case EPISODES.ADD_EPISODES:
            return {
                ...state,
                episodes: add(payload, episodes)
            }
        case EPISODES.DELETE_EPISODES:
            return {
                ...state,
                episodes: filter(payload, episodes)
            }
        case EPISODES.UPDATE_EPISODES:
            return {
                ...state,
                episodes: update(payload, episodes)
            }
        default:
            return {
                ...state,
            }
    }
}

export default episoderReducer