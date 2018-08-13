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

    registerUser = (user) => {
        return fetch(`${SERVER_URL}/register`, {
            body: JSON.stringify(user),
            // credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
            .then(response => response.json())
    }

    loginUser = (user) => {
        return fetch(`${SERVER_URL}/login`, {
            body: JSON.stringify(user),
            // credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
            .then(response => response.json())
    }

}