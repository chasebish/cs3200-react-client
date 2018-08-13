import React from 'react'
import Youtube from 'react-youtube'

const VideoComponent = () => (
    <div>
        <Youtube
            videoId='YId_6G-YLpQ'
            opts={opts}
            onReady={onReady}
        />
    </div>
)

const onReady = (event) => event.target.pauseVideo()

const opts = {
    height: '390',
    width: '640',
    playerVars: {
        autoplay: 0
    }
}

export default VideoComponent