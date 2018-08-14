/* global fetch */

import { SERVER_URL } from '../constants'

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

    getVideos = () => {
        return fetch(`${SERVER_URL}/video`)
            .then(response => response.json())
    }

    addVideo = (video) => {
        return fetch(`${SERVER_URL}/video`, {
            body: JSON.stringify(video),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
            .then(response => response.json())
    }

}