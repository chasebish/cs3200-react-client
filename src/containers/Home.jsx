import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { DescriptionComponent } from '../components'
import { VideoComponent } from '../components'
import { VideoService } from '../services'
import { videoActions } from '../constants'

class HomeComponent extends React.Component {

    constructor(props) {
        console.log(`${process.env.YOUTUBE_API_KEY}`)
        super(props)
        this.videoService = VideoService.instance
    }

    componentDidMount() {
        this.videoService.getVideos()
            .then(videos => {
                this.props.setVideos(videos)
                console.log(this.props.videos)
            }, () => {
                console.warn('Error retrieving videos')
            })
    }

    renderVideos = () => {

    }

    render() {
        return (
            <div>
                <h1 className='display-3'>Rotten Potatoes</h1>
                <div className='row'>
                    <div className='col-lg-8'>
                        <h3>Videos</h3>
                    </div>
                    <div className='col-lg-4'>
                        <h3>Description</h3>
                    </div>
                </div>
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