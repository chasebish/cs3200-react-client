import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Navbar } from '.'
import { Home, Login, Profile, Register, Video, VideoRequest } from '../containers'


const RootComponent = () => (
    <BrowserRouter>
        <div>
            <Navbar />
            <div className="container">
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/profile' component={Profile} />
                    <Route exact path='/register' component={Register} />
                    <Route exact path='/video' component={Video} />
                    <Route exact path='/request' component={VideoRequest} />
                </Switch>
            </div>
        </div>
    </BrowserRouter>
)

export default RootComponent