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
    case videoActions.SORT_LIKES: {
        return {
            ...state,
            videos: state.videos.sort((a, b) => b.likes - a.likes)
        }
    }
    case videoActions.SORT_DISLIKES:
        return {

        }
    case videoActions.SORT_OVERALL:
        return {

        }
    case videoActions.SORT_HUMOR:
        return {

        }
    case videoActions.SORT_INFORMATIVE:
        return {

        }
    case videoActions.SORT_PRODUCTION:
        return {

        }
    case videoActions.SORT_CUTENESS:
        return {

        }
    case videoActions.SORT_SADNESS:
        return {

        }
    default:
        return state
    }

}

export default video