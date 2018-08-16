import { videoActions } from '../constants'

let initialState = {
    videos: [],
    searchVideos: []
}

const video = (state = initialState, action) => {

    switch(action.type) {

    case videoActions.SET_VIDEOS:
        return {
            ...state,
            videos: action.videos
        }
    case videoActions.SET_SEARCH_VIDEOS:
        return {
            ...state,
            searchVideos: action.searchVideos
        }
    case videoActions.REMOVE_SEARCH_VIDEOS:
        return {
            ...state,
            searchVideos: []
        }
    default:
        return state
    }

}

export default video