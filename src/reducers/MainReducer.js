import { mainActions } from '../constants'

let initialState = {
    youtubeApiKey: ''
}

const main = (state = initialState, action) => {

    switch(action.type) {

    case mainActions.SET_YOUTUBE_API_KEY:
        return {
            ...state,
            youtubeApiKey: action.youtubeApiKey
        }
    default:
        return state
    }

}

export default main