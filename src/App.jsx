import React from 'react'
import { combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux'
import { main, user, video } from './reducers'

import { RootComponent } from './components'

const rootReducer = combineReducers({
    main,
    user,
    video
})

const store = createStore(rootReducer)

const App = () => (
    <Provider store={store}>
        <RootComponent />
    </Provider>
)

export default App