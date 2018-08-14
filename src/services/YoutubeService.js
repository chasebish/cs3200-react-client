/* global fetch */

const YOUTUBE_URL = 'https://www.googleapis.com/youtube/v3/videos?part=statistics%2C+snippet&id=YOUTUBEID&key='

let _singleton = Symbol()

export default class YoutubeService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.')
    }
    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new YoutubeService(_singleton)
        return this[_singleton]
    }

    getVideoData = (videoId, apiKey) => {
        return fetch(`${YOUTUBE_URL}${apiKey}`.replace('YOUTUBEID', videoId))
            .then(response => response.json())
    }

}