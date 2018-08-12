import React from 'react'

import { DescriptionComponent } from '../components'
import { VideoComponent } from '../components'

export default class Home extends React.Component {

    render() {
        return (
            <div>
                <h1 className='display-3'>Rotten Potatoes</h1>
                <div className='row'>
                    <div className='col-lg-8'>
                        <h3>Top Videos</h3>
                        <VideoComponent />
                    </div>
                    <div className='col-lg-4'>
                        <h3>Description</h3>
                        <DescriptionComponent />
                    </div>
                </div>
            </div>
        )
    }

}