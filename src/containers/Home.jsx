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

    state = {
        sort: 'VIEW'
    }

    componentDidMount() {
        this.videoService.getVideos()
            .then(videos => {
                this.props.setVideos(videos)
            }, () => {
                console.warn('Error retrieving videos')
            })
    }

    viewState = () => this.setState({ sort: 'VIEW' })
    likeState = () => this.setState({ sort: 'LIKE' })
    dislikeState = () => this.setState({ sort: 'DISLIKE' })
    overallState = () => this.setState({ sort: 'OVERALL' })
    humorState = () => this.setState({ sort: 'HUMOR' })
    informativeState = () => this.setState({ sort: 'INFORMATIVE' })
    productionState = () => this.setState({ sort: 'PRODUCTION' })
    cuteState = () => this.setState({ sort: 'CUTE' })
    sadState = () => this.setState({ sort: 'SAD' })

    renderVideos = sortedVideos => {

        let videos = []

        for (let video of sortedVideos) {
            const component =
                <div className='videoDesc mt-3 bg-light' key={video.youtubeID}>
                    <div className='row m-1 mt-2 mb-2'>
                        <div className='col-lg-8 col-xl-7'>
                            <VideoComponent url={video.youtubeID} />
                        </div>
                        <div className='col-lg-4 col-xl-5 align-middle'>
                            <DescriptionComponent className='leftMargin' video={video} />
                        </div>
                    </div>
                </div>
            videos.push(component)
        }
        return videos
    }

    viewSort = () => this.renderVideos(this.props.videos.sort((a, b) => b.viewCount - a.viewCount))
    likeSort = () => this.renderVideos(this.props.videos.sort((a, b) => b.likes - a.likes))
    dislikeSort = () => this.renderVideos(this.props.videos.sort((a, b) => b.dislikes - a.dislikes))
    overallSort = () => this.renderVideos(this.props.videos.sort((a, b) => b.avgOverall - a.avgOverall))
    humorSort = () => this.renderVideos(this.props.videos.sort((a, b) => b.avgHumor - a.avgHumor))
    informativeSort = () => this.renderVideos(this.props.videos.sort((a, b) => b.avgInformativeness - a.avgInformativeness))
    productionSort = () => this.renderVideos(this.props.videos.sort((a, b) => b.avgProduction - a.avgProduction))
    cuteSort = () => this.renderVideos(this.props.videos.sort((a, b) => b.avgCuteness - a.avgCuteness))
    sadSort = () => this.renderVideos(this.props.videos.sort((a, b) => b.avgSadness - a.avgSadness))

    active = sortType => {
        if (this.state.sort === sortType) { return 'active' }
    }


    render() {
        return (
            <div>
                <h1 className='display-3'>Rotten Potatoes</h1>
                <div className='text-center'>
                    <div className="btn-group-sm" role="group" aria-label="Basic example">
                        <button onClick={() => this.viewState()} type="button" className={`btn btn-outline-info m-1 ${this.active('VIEW')}`}>Views</button>
                        <button onClick={() => this.likeState()} type="button" className={`btn btn-outline-info m-1 ${this.active('LIKE')}`}>Likes</button>
                        <button onClick={() => this.dislikeState()} type="button" className={`btn btn-outline-info m-1 ${this.active('DISLIKE')}`}>Dislikes</button>
                        <button onClick={() => this.overallState()} type="button" className={`btn btn-outline-info m-1 ${this.active('OVERALL')}`}>Overall</button>
                        <button onClick={() => this.humorState()} type="button" className={`btn btn-outline-info m-1 ${this.active('HUMOR')}`}>Humor</button>
                        <button onClick={() => this.informativeState()} type="button" className={`btn btn-outline-info m-1 ${this.active('INFORMATIVE')}`}>Informativeness</button>
                        <button onClick={() => this.productionState()} type="button" className={`btn btn-outline-info m-1 ${this.active('PRODUCTION')}`}>Production</button>
                        <button onClick={() => this.cuteState()} type="button" className={`btn btn-outline-info m-1 ${this.active('CUTE')}`}>Cuteness</button>
                        <button onClick={() => this.sadState()} type="button" className={`btn btn-outline-info m-1 ${this.active('SAD')}`}>Sadness</button>
                    </div>
                </div>
                {this.state.sort === 'VIEW' && this.viewSort()}
                {this.state.sort === 'LIKE' && this.likeSort()}
                {this.state.sort === 'DISLIKE' && this.dislikeSort()}
                {this.state.sort === 'OVERALL' && this.overallSort()}
                {this.state.sort === 'HUMOR' && this.humorSort()}
                {this.state.sort === 'INFORMATIVE' && this.informativeSort()}
                {this.state.sort === 'PRODUCTION' && this.productionSort()}
                {this.state.sort === 'CUTE' && this.cuteSort()}
                {this.state.sort === 'SAD' && this.sadSort()}
            </div>
        )
    }

}

HomeComponent.propTypes = {
    setVideos: PropTypes.func,
    videos: PropTypes.array,

    sortLikes: PropTypes.func
}

const mapStateToProps = state => (
    {
        videos: state.video.videos
    }
)

const mapDispatchToProps = dispatch => (
    {
        setVideos: videos => dispatch({ type: videoActions.SET_VIDEOS, videos }),
        sortLikes: () => dispatch({ type: videoActions.SORT_LIKES })
    }
)

const Home = connect(mapStateToProps, mapDispatchToProps)(HomeComponent)
export default Home