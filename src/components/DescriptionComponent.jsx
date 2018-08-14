import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

const DescriptionComponent = ({ video }) => (
    <div className='descriptionTopMargin text-center'>
        <h5 className='lead'>{video.title}</h5>
        <p className='text-info'>Views: {video.viewCount}</p>
        <div className='row justify-content-center'>
            <p className='text-success col-4'>Likes: {video.likes}</p>
            <p className='text-danger col-4'>Dislikes: {video.dislikes}</p>
        </div>
        <Link to={`/video/${video.youtubeID}`} className='btn btn-outline-primary btn-block'>
            Go to video
        </Link>
    </div>
)

DescriptionComponent.propTypes = {
    video: PropTypes.any
}

export default DescriptionComponent