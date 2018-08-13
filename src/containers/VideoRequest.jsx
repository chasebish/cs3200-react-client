import React from 'react'

import { VideoComponent } from '../components'

export default class VideoRequest extends React.Component {

    render() {
        return (
            <div className='jumbotron bg-light'>
                <h1 className='display-3 mb-3'>Request a Video</h1>
                <label htmlFor="videoRequest">Video Request</label>
                <div className="input-group">
                    <input className="form-control" id="videoRequest" />
                    <div className='input-group-append'>
                        <button className='btn btn-success'>
                            Submit
                        </button>
                    </div>
                </div>
                <div className='text-center mt-5'>
                    <VideoComponent />
                </div>
            </div>
        )
    }

}