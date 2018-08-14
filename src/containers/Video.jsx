import React from 'react'
import PropTypes from 'prop-types'

import { VideoComponent } from '../components'
import { VideoService } from '../services'

export default class VideoClass extends React.Component {

    constructor(props) {
        super(props)
        this.videoService = VideoService.instance
    }

    state = {
        youtubeID: '',
        video: {}
    }
    
    componentDidMount() {
        this.setYoutubeID(this.props.match.params.videoId)
        this.videoService.findByYoutubeId(this.props.match.params.videoId)
            .then(video => {
                this.setVideo(video)
                console.log(video)
            }, () => console.warm('Could not find video'))
    }

    setYoutubeID = youtubeID => this.setState({ youtubeID })
    setVideo = video => this.setState({ video })

    render() {
        return (
            <div className='jumbotron'>
                <div className='text-center mb-3'>
                    <h3 className='font-weight-light'>{this.state.video.title}</h3>
                </div>
                <VideoComponent url={this.state.video.youtubeID}/>
            </div>
        )
    }

}

VideoClass.propTypes = {
    match: PropTypes.object
}