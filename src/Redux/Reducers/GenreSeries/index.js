import { GENRE_SERIES } from "../../ActionTypes/GenreSeries"

const initialState = {
    genreSeries : []
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



const genreSeriesReducer = ( state = initialState, action) => {
    const { type, payload } = action
    const { genreSeries } = state

    switch(type) {
        case GENRE_SERIES.GET_GENRE_SERIES:
            return {
                ...state,
                genreSeries: payload
            }
        case GENRE_SERIES.UPDATE_GENRE_SERIES:
            return {
                ...state,
                genreSeries: update(payload, genreSeries)
            }
        default: {
            return {
                ...state,
            }
        }
    }
}

export default genreSeriesReducer