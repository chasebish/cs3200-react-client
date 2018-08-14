/* global window */

import React from 'react'
import PropTypes from 'prop-types'
import YouTubePlayer from 'react-player/lib/players/YouTube'

import './components.css'

export default class VideoComponent extends React.Component {

    state = {
        width: 0,
        height: 0
    }

    componentDidMount() {
        this.updateWindowDimensions()
        window.addEventListener('resize', this.updateWindowDimensions)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions)
    }

    updateWindowDimensions = () => {
        if (window.innerWidth <= 768) {
            this.setState({ width: 330, height: 185.5 })
        } else {
            this.setState({ width: 640, height: 360 })
        }
    }

    render() {
        return (
            <YouTubePlayer
                url={`http://www.youtube.com/watch?v=${this.props.url}`}
                className='video'
                height={this.state.height}
                width={this.state.width}
            />
        )
    }
}

VideoComponent.propTypes = {
    url: PropTypes.string
}
