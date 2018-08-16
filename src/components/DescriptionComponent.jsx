import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { Progress } from 'reactstrap'

import './components.css'

const DescriptionComponent = ({ video }) => (
    <div className='descriptionTopMargin text-center'>
        <h5 className='lead'>{video.title}</h5>
        <p className='text-primary'>Views: {video.viewCount}</p>
        <div className='row justify-content-center'>
            <p className='text-success col-4'>Likes: {video.likes}</p>
            <p className='text-danger col-4'>Dislikes: {video.dislikes}</p>
        </div>
        <Progress multi className='mb-2'>
            <Progress bar color="success" value={(video.likes / (video.likes + video.dislikes)) * 100} />
            <Progress bar color="danger" value={(video.dislikes / (video.likes + video.dislikes)) * 100} />
        </Progress>
        <div className='row justify-content-center m-b-neg-20'>
            <p className='text-info col-xl-3 col-lg-4 col-md-3 col-4'>Overall</p>
            <p className='text-info col-xl-3 col-lg-4 col-md-3 col-4'>Informative</p>
            <p className='text-info col-xl-3 col-lg-4 col-md-3 col-4'>Humor</p>
        </div>
        <div className='row justify-content-center'>
            <p className='text-info col-xl-3 col-lg-4 col-md-3 col-4'>{video.avgOverall}</p>
            <p className='text-info col-xl-3 col-lg-4 col-md-3 col-4'>{video.avgInformativeness}</p>
            <p className='text-info col-xl-3 col-lg-4 col-md-3 col-4'>{video.avgHumor}</p>
        </div>
        <div className='row justify-content-center m-b-neg-20'>
            <p className='text-info col-xl-3 col-lg-4 col-md-3 col-4'>Production</p>
            <p className='text-info col-xl-3 col-lg-4 col-md-3 col-4'>Cuteness</p>
            <p className='text-info col-xl-3 col-lg-4 col-md-3 col-4'>Sadness</p>
        </div>
        <div className='row justify-content-center'>
            <p className='text-info col-xl-3 col-lg-4 col-md-3 col-4'>{video.avgProduction}</p>
            <p className='text-info col-xl-3 col-lg-4 col-md-3 col-4'>{video.avgCuteness}</p>
            <p className='text-info col-xl-3 col-lg-4 col-md-3 col-4'>{video.avgSadness}</p>
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