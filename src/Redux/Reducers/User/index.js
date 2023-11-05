import { USER } from "../../ActionTypes/User";

const initialState = {
    user_detail: {}
}

const userReducer = ( state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case USER.USER_DETAILS:
            return {
                ...state,
                user_detail: payload
            }
        default:
            return {
                ...state,
            }
    }
}

export default userReducer