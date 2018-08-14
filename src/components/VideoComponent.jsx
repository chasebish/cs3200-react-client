import React from 'react'
import PropTypes from 'prop-types'

import './components.css'

export default class VideoComponent extends React.Component {

    render() {
        return (
            <div className="embed-responsive embed-responsive-16by9 video">
                <iframe title={this.props.url} className="embed-responsive-item" src={`https://www.youtube.com/embed/${this.props.url}?rel=0`}></iframe>
            </div>
        )
    }
}

VideoComponent.propTypes = {
    url: PropTypes.string
}
