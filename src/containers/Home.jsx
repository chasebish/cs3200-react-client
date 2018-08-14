import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { DescriptionComponent } from '../components'
import { VideoComponent } from '../components'
import { VideoService } from '../services'
import { videoActions } from '../constants'

import './containers.css'

class HomeComponent extends React.Component {

    constructor(props) {
        super(props)
        this.videoService = VideoService.instance
    }

    componentDidMount() {
        this.videoService.getVideos()
            .then(videos => {
                this.props.setVideos(videos)
            }, () => {
                console.warn('Error retrieving videos')
            })
    }

    renderVideos = () => {

        let videos = []

        for (let video of this.props.videos) {
            const component =
                <div className='videoDesc mt-3 bg-light' key={video.youtubeID}>
                    <div className='row m-1 mt-2 mb-2'>
                        <div className='col-lg-8 col-xl-7 chaseContainer'>
                            <VideoComponent url={video.youtubeID} />
                        </div>
                        <div className='col-lg-4 col-xl-5'>
                            <DescriptionComponent className='leftMargin' video={video}/>
                        </div>
                    </div>
                </div>
            videos.push(component)
        }
        return videos
    }


    render() {
        return (
            <div>
                <h1 className='display-3'>Rotten Potatoes</h1>
                <div className='row'>
                    <div className='col-lg-8'>
                        <h3>Videos</h3>
                    </div>
                </div>
                {this.renderVideos()}
            </div>
        )
    }

}

HomeComponent.propTypes = {
    setVideos: PropTypes.func,
    videos: PropTypes.array
}

const mapStateToProps = state => (
    {
        videos: state.video.videos
    }
)

const mapDispatchToProps = dispatch => (
    {
        setVideos: videos => dispatch({ type: videoActions.SET_VIDEOS, videos })
    }
)

const Home = connect(mapStateToProps, mapDispatchToProps)(HomeComponent)
export default Home