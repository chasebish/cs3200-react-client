import { userActions } from '../constants'

let initialState = {
    user: {}
}

const user = (state = initialState, action) => {

    switch(action.type) {

    case userActions.SET_USER:
        return {
            ...state,
            user: action.user
        }
    case userActions.LOGOUT_USER:
        return {
            ...state,
            user: {}
        }
    default:
        return state
    }

}

export default user