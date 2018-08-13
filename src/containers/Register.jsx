import React from 'react'

export default class Register extends React.Component {

    render() {
        return (
            <div className='jumbotron bg-light'>
                <h1 className='display-3'>Register</h1>
                <div className='form-group row'>
                    <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-10">
                        <input type="email" className="form-control" id="email" placeholder="Email" />
                    </div>
                </div>
                <div className='form-group row'>
                    <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
                    <div className="col-sm-10">
                        <input type="password" className="form-control" id="password" placeholder="Password" />
                    </div>
                </div>
                <div className='form-group row'>
                    <label htmlFor="confirmPassword" className="col-sm-2 col-form-label">Confirm Password</label>
                    <div className="col-sm-10">
                        <input type="password" className="form-control" id="confirmPassword" placeholder="Password" />
                    </div>
                </div>
            </div>
        )
    }

}