import React from 'react'

import { VideoComponent } from '../components'
import { YoutubeService } from '../services'

import './containers.css'

export default class VideoRequest extends React.Component {

    constructor(props) {
        super(props)
        this.youtubeService = YoutubeService.instance
    }

    state = {
        videoId: '',
        videoObject: {}
    }

    updateVideoId = event => this.setState({ videoId: event.target.value, videoObject: {} })
    noVideo = () => !this.state.videoObject.pageInfo || this.state.videoObject.pageInfo.totalResults === 0
    errorvideo = () => this.state.videoObject.pageInfo && this.state.videoObject.pageInfo.totalResults === 0
    validVideo = () => this.state.videoObject.pageInfo && this.state.videoObject.pageInfo.totalResults > 0

    previewVideo = () => {
        this.youtubeService.getVideoData(this.state.videoId)
            .then(video => {
                this.setState({ videoObject: video })
            }, () => {
                console.warn('Error getting response')
            })
    }

    submitVideo = () => {
        console.log(this.state.videoId)
    }

    render() {
        return (
            <div className='jumbotron bg-light'>
                <h1 className='display-3 mb-3'>Request a Video</h1>
                {this.errorvideo() &&
                    <div className="alert alert-danger mt-2 mb-2" role="alert">
                        The Video ID you submitted is invalid
                    </div>
                }
                <label htmlFor="videoRequest">Video Request</label>
                <div className="input-group">
                    <input value={this.state.videoId} onChange={this.updateVideoId} className="form-control" id="videoRequest" />
                    {this.noVideo() &&
                        <div className='input-group-append'>
                            <button className='btn btn-info' onClick={() => this.previewVideo()}>
                                Preview
                            </button>
                        </div>
                    }
                    {this.validVideo() &&
                        <div className='input-group-append'>
                            <button className='btn btn-success' onClick={() => this.submitVideo()}>
                                Submit
                            </button>
                        </div>
                    }
                </div>
                {this.validVideo() &&
                    <div className='chaseContainer'>
                        <div className='mt-5'>
                            <VideoComponent 
                                url={this.state.videoId}
                            />
                        </div>
                    </div>
                }
            </div>
        )
    }

}