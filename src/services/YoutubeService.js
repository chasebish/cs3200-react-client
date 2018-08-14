/* global fetch */

import { API_KEY } from '../constants'
const YOUTUBE_URL = 'https://www.googleapis.com/youtube/v3/videos?part=statistics%2C+snippet&id=YOUTUBEID&key='

let _singleton = Symbol()

export default class MusicService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.')
    }
    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new MusicService(_singleton)
        return this[_singleton]
    }

    getVideoData = videoId => {
        return fetch(`${YOUTUBE_URL}${API_KEY}`.replace('YOUTUBEID', videoId))
            .then(response => response.json())
    }

}