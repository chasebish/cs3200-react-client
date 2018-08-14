import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { VideoComponent } from '../components'
import { VideoService, YoutubeService } from '../services'

import './containers.css'

class VideoRequestComponent extends React.Component {

    constructor(props) {
        super(props)
        this.videoService = VideoService.instance
        this.youtubeService = YoutubeService.instance
    }

    state = {
        videoExists: false,
        videoId: '',
        videoObject: {},
        videoSubmitted: false
    }

    updateVideoId = event => this.setState({ videoId: event.target.value, videoObject: {}, videoExists: false, videoSubmitted: false })

    noVideo = () => !this.state.videoObject.pageInfo || this.state.videoObject.pageInfo.totalResults === 0
    errorvideo = () => this.state.videoObject.pageInfo && this.state.videoObject.pageInfo.totalResults === 0
    validVideo = () => this.state.videoObject.pageInfo && this.state.videoObject.pageInfo.totalResults > 0 && !this.state.videoExists

    previewVideo = () => {

        this.videoService.findByYoutubeId(this.state.videoId)
            .then(() => {
                // VIDEO EXISTS ALREADY
                this.setState({ videoExists: true })
            }, () => {
                // VIDEO DOES NOT EXIST
                this.setState({ videoExists: false })
                this.youtubeService.getVideoData(this.state.videoId, this.props.youtubeApiKey)
                    .then(video => {
                        console.log(video)
                        this.setState({ videoObject: video })
                    }, () => {
                        console.warn('Error hitting Youtube API')
                    })
            })
    }

    submitVideo = () => {
        const videoProps = this.state.videoObject.items[0]
        const stats = videoProps.statistics
        const video = {
            youtubeID: videoProps.id,
            title: videoProps.snippet.title,
            channelTitle: videoProps.snippet.channelTitle,
            likes: stats.likeCount,
            dislikes: stats.dislikeCount,
            viewCount: stats.viewCount
        }

        this.videoService.addVideo(video)
            .then(() => {
                this.setState({ videoSubmitted: true })
            }, () => {
                console.warn('Error posting video')
            })

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
                    <div className='text-center'>
                        <div className='mt-5'>
                            <h4>{this.state.videoObject.items[0].snippet.title}</h4>
                            <VideoComponent
                                url={this.state.videoId}
                            />
                        </div>
                    </div>
                }
                {this.state.videoSubmitted &&
                    <div>
                        <div className="alert alert-success mt-3 text-center" role="alert">
                            Your video has been submitted!
                        </div>
                        <p className='text-center m-b-neg'><small>Thank you for the submission.  You can leave a review here!</small></p>
                    </div>
                }
                {this.state.videoExists &&
                    <div>
                        <div className="alert alert-info mt-3 text-center" role="alert">
                            The Video ID you submitted already exists
                        </div>
                        <p className='text-center m-b-neg'><small>Please request a video that is unique</small></p>
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

VideoRequestComponent.propTypes = {
    youtubeApiKey: PropTypes.string
}

const mapStateToProps = state => (
    {
        youtubeApiKey: state.main.youtubeApiKey
    }
)

const VideoRequest = connect(mapStateToProps)(VideoRequestComponent)
export default VideoRequest