/* global fetch */

import { SERVER_URL } from '../constants'

let _singleton = Symbol()

export default class UserService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.')
    }
    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new UserService(_singleton)
        return this[_singleton]
    }

    registerUser = user => {
        return fetch(`${SERVER_URL}/register`, {
            body: JSON.stringify(user),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
            .then(response => response.json())
    }

    loginUser = user => {
        return fetch(`${SERVER_URL}/login`, {
            body: JSON.stringify(user),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
            .then(response => response.json())
    }

    updateUser = (userId, user) => {
        return fetch(`${SERVER_URL}/user/${userId}`, {
            body: JSON.stringify(user),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT'
        })
            .then(response => response.json())
    }

    logout = () => {
        return fetch(`${SERVER_URL}/logout`, {
            credentials: 'include',
            method: 'POST'
        })
    }

    findUserById = userId => {
        return fetch(`${SERVER_URL}/user/${userId}`, {
            credentials: 'include'
        })
            .then(response => response.json())
    }

    profile = () => {
        return fetch(`${SERVER_URL}/profile`, {
            credentials: 'include'
        })
            .then(response => response.json())
    }

}