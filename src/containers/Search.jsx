import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { DescriptionComponent } from '../components'
import { VideoComponent } from '../components'
import { VideoService } from '../services'
import { videoActions } from '../constants'

class SearchComponent extends React.Component {

    constructor(props) {
        super(props)
        this.videoService = VideoService.instance
    }

    state = {
        query: ''
    }

    componentDidMount() {
        this.setState({ query: this.props.match.params.query })
        this.videoService.search(this.props.match.params.query)
            .then(searchVideos => {
                this.props.setSearchVideos(searchVideos)
            }, () => {
                console.warn('Error retrieving videos')
            })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.query !== this.props.match.params.query) {
            this.setState({ query: this.props.match.params.query })
            this.videoService.search(this.props.match.params.query)
                .then(searchVideos => {
                    this.props.setSearchVideos(searchVideos)
                }, () => {
                    console.warn('Error retrieving videos')
                })
        }
    }

    componentWillUnmount() {
        this.props.removeSearchvideos()
    }

    renderVideos = () => {

        let videos = []

        for (let video of this.props.searchVideos) {
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

    render() {

        return (
            <div>
                <h1 className='font-weight-light'>{this.props.searchVideos.length} results for &quot;{this.state.query}&quot;</h1>
                {this.renderVideos()}
            </div>
        )

    }

}

SearchComponent.propTypes = {
    match: PropTypes.object,
    searchVideos: PropTypes.array,
    setSearchVideos: PropTypes.func,
    removeSearchvideos: PropTypes.func
}

const mapStateToProps = state => (
    {
        searchVideos: state.video.searchVideos
    }
)

const mapDispatchToProps = dispatch => (
    {
        setSearchVideos: searchVideos => dispatch({ type: videoActions.SET_SEARCH_VIDEOS, searchVideos }),
        removeSearchvideos: () => dispatch({ type: videoActions.REMOVE_SEARCH_VIDEOS })
    }
)

const Search = connect(mapStateToProps, mapDispatchToProps)(SearchComponent)
export default Search