import { combineReducers } from "redux";
import userReducer from "./Reducers/User";
import genreReducer from "./Reducers/Genre";
import seriesReducer from "./Reducers/Series";

const Reducers = combineReducers({
    user: userReducer,
    genre: genreReducer,
    series: seriesReducer,
})

export default Reducers