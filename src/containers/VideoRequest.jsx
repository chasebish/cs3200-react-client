import React from 'react'

import { VideoComponent } from '../components'
import { VideoService, YoutubeService } from '../services'

import './containers.css'

export default class VideoRequest extends React.Component {

    constructor(props) {
        super(props)
        this.videoService = VideoService.instance
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
        const videoProps = this.state.videoObject.items[0]
        const video = {
            youtubeID: videoProps.id,
            title: videoProps.snippet.title,
            channelTitle: videoProps.snippet.channelTitle
        }

        this.videoService.addVideo(video)
            .then(video => {
                console.log(video)
            }, () => console.warn('Error posting video'))

    }

    render() {
        return (
            <div className='jumbotron bg-light'>
                <h1 className='display-3 mb-3'>Request a Video</h1>
                <label htmlFor="videoRequest">Video ID</label>
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
                            <h4>{this.state.videoObject.items[0].snippet.title}</h4>
                            <VideoComponent
                                url={this.state.videoId}
                            />
                        </div>
                    </div>
                }
                {this.errorvideo() &&
                    <div>
                        <div className="alert alert-danger mt-3 text-center" role="alert">
                            The Video ID you submitted is invalid
                        </div>
                        <p className='text-center m-b-neg'><small>Make sure you are just submitting the video ID, not the whole URL!</small></p>
                    </div>
                }
            </div>
        )
    }

}