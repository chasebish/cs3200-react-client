/* global fetch */

import { SERVER_URL } from '../constants'

let _singleton = Symbol()

export default class MainService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.')
    }
    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new MainService(_singleton)
        return this[_singleton]
    }

    getYoutubeKey = () => {
        console.log(`${SERVER_URL}/youtubeApi`)
        return fetch(`${SERVER_URL}/youtubeApi`)
            .then(response => response.text())
    }

}