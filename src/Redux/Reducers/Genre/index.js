import { GENRE } from "../../ActionTypes/Genre"

const initialState = {
    genres: []
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

const genreReducer = (state = initialState, action) => {

    const { type, payload } = action
    let { genres } = state

    switch (type) {
        case GENRE.GET_GENRE:
            return {
                ...state,
                genres: payload
            }
        case GENRE.UPDATE_GENRE:
            return {
                ...state,
                genres: update(payload, genres)
            }
        case GENRE.DELETE_GENRE:
            return {
                ...state,
                genres: filter(payload, genres)
            }
        case GENRE.ADD_GENRE:
            return {
                ...state,
                genres: add( payload, genres)
            }
        default:
            return {
                ...state
            }
    }
}

export default genreReducer