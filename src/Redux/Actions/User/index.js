import { USER } from "../../ActionTypes/User"

export const userDetail = ( data ) => {
    return {
        type: USER.USER_DETAILS,
        payload: data
    }
}