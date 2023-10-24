import { combineReducers } from "redux";
import userReducer from "./Reducers/User";
import genreReducer from "./Reducers/Genre";
import seriesReducer from "./Reducers/Series";
import genreSeriesReducer from "./Reducers/GenreSeries";

const Reducers = combineReducers({
    user: userReducer,
    genre: genreReducer,
    series: seriesReducer,
    genreSeries: genreSeriesReducer
})

export default Reducers