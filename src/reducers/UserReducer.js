let initialState = {
    id: '',
    username: '',
    password: '',
    reviews: []
}

const user = (state = initialState, action) => {

    switch(action.type) {

    case 'SET_USER':
        return {
            ...state,
            id: action.id,
            user: action.username,
            password: action.password,
            reviews: action.reviews
        }
    default:
        return state
    }

}

export default user