import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { Progress } from 'reactstrap'

const DescriptionComponent = ({ video }) => (
    <div className='descriptionTopMargin text-center'>
        <h5 className='lead'>{video.title}</h5>
        <p className='text-info'>Views: {video.viewCount}</p>
        <div className='row justify-content-center'>
            <p className='text-success col-4'>Likes: {video.likes}</p>
            <p className='text-danger col-4'>Dislikes: {video.dislikes}</p>
        </div>
        <Progress multi className='mb-2'>
            <Progress bar color="success" value={(video.likes / (video.likes + video.dislikes)) * 100} />
            <Progress bar color="danger" value={(video.dislikes / (video.likes + video.dislikes)) * 100} />
        </Progress>
        <Link to={`/video/${video.youtubeID}`} className='btn btn-outline-primary btn-block'>
            Go to video
        </Link>
    </div>
)

DescriptionComponent.propTypes = {
    video: PropTypes.any
}

export default DescriptionComponent