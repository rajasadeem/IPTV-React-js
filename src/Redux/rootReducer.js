import { combineReducers } from "redux";
import userReducer from "./Reducers/User";
import genreReducer from "./Reducers/Genre";
import seriesReducer from "./Reducers/Series";
import genreSeriesReducer from "./Reducers/GenreSeries";
import seasonsReducer from "./Reducers/Seasons";
import episoderReducer from "./Reducers/Episodes";

const Reducers = combineReducers({
    user: userReducer,
    genre: genreReducer,
    series: seriesReducer,
    genreSeries: genreSeriesReducer,
    seasons: seasonsReducer,
    episodes: episoderReducer
})

export default Reducers