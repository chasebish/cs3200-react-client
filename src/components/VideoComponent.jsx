/* global window */

import React from 'react'
import YouTubePlayer from 'react-player/lib/players/YouTube'

export default class VideoComponent extends React.Component {

    state = {
        width: 0,
        height: 0
    }

    componentDidMount() {
        this.updateWindowDimensions()
        window.addEventListener('resize', this.updateWindowDimensions)
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
                url='http://www.youtube.com/watch?v=YId_6G-YLpQ'
                className='bg-secondary p-2'
                height={this.state.height}
                width={this.state.width}
            />
        )
    }
}
