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
    }

    updateWindowDimensions = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight })
    }

    render() {
        return (
            <div>
                {window.innerWidth >= 768 &&
                    <YouTubePlayer
                        url='http://www.youtube.com/watch?v=YId_6G-YLpQ'
                        className='bg-secondary p-2'
                    />
                }
                {window.innerWidth <= 768 &&
                    <YouTubePlayer
                        url='http://www.youtube.com/watch?v=YId_6G-YLpQ'
                        height={185.5}
                        width={330}
                        className='bg-secondary p-2'
                    />
                }
            </div>
        )
    }
}
