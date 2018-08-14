import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

const DescriptionComponent = ({ video }) => (
    <div className='descriptionTopMargin'>
        {console.log(video)}
        <Link to={`/video/${video.youtubeID}`} className='btn btn-info btn-block'>
            Go to video
        </Link>
        <h5>Rating</h5>
        <h5>Description</h5>
        <h5>Youtube Rating</h5>
    </div>
)

DescriptionComponent.propTypes = {
    video: PropTypes.any
}

export default DescriptionComponent