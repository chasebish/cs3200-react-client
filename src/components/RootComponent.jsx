import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import { Navbar } from '.'
import { Home, Login, Profile, Register, Search, Video, VideoRequest } from '../containers'
import { mainActions } from '../constants'
import { MainService } from '../services'

class RootClass extends React.Component {

    constructor(props) {
        super(props)
        this.mainService = MainService.instance
    }

    componentDidMount() {
        this.mainService.getYoutubeKey()
            .then(key => {
                this.props.setYoutubeApiKey(key)
            }, () => console.warn('Could not get Youtube API key'))
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Navbar />
                    <div className="container pb-5">
                        <Switch>
                            <Route exact path='/' component={Home} />
                            <Route exact path='/login' component={Login} />
                            <Route exact path='/profile' component={Profile} />
                            <Route exact path='/register' component={Register} />
                            <Route exact path='/request' component={VideoRequest} />
                            <Route exact path='/search' render={() => (<Redirect to="/" />)} />
                            <Route exact path='/search/:query' component={Search} />
                            <Route exact path='/video/:videoId' component={Video} />
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        )
    }

}

RootClass.propTypes = {
    youtubeApiKey: PropTypes.string,
    setYoutubeApiKey: PropTypes.func
}


const mapStateToProps = state => (
    {
        youtubeApiKey: state.main.youtube_api_key
    }
)

const mapDispatchToProps = dispatch => (
    {
        setYoutubeApiKey: youtubeApiKey => dispatch({ type: mainActions.SET_YOUTUBE_API_KEY, youtubeApiKey })
    }
)

const RootComponent = connect(mapStateToProps, mapDispatchToProps)(RootClass)
export default RootComponent