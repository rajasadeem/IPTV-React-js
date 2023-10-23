import { SERIES } from "../../ActionTypes/Series"

const initialState = {
    series: []
}

const add = (payload, data) => {
    return [...data, payload]
}

const filter = (payload, data) => {
    return data?.filter(item => item?._id !== payload?.id)
}

const seriesReducer = (state = initialState, action) => {
    const { type, payload } = action
    const { series } = state

    switch (type) {
        case SERIES.ADD_SERIES:
            return {
                ...state,
                series: add(payload, series)
            }
        case SERIES.GET_SERIES:
            return {
                ...state,
                series: payload
            }
        case SERIES.DELETE_SERIES:
            return {
                ...state,
                series: filter(payload, series)
            }
        default:
            return {
                ...state,
            }
    }
}

export default seriesReducer