/* global window */

import React from 'react'
import PropTypes from 'prop-types'

import './components.css'

export default class VideoComponent extends React.Component {

    state = {
        width: 0,
        height: 0
    }

    componentDidMount() {
        this.updateWindowDimensions()
        window.addEventListener('resize', this.updateWindowDimensions)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions)
    }

    updateWindowDimensions = () => {
        if (window.innerWidth <= 576) {
            this.setState({ width: window.innerWidth - 70, height: (window.innerWidth - 70) * 360 / 640 })
        } else {
            this.setState({ width: 640, height: 360 })
        }
    }

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
