import { videoActions } from '../constants'

let initialState = {
    videos: []
}

const video = (state = initialState, action) => {

    switch(action.type) {

    case videoActions.SET_VIDEOS:
        return {
            ...state,
            videos: action.videos
        }
    default:
        return state
    }

}

export default video