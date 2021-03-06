/* global alert */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { UserService } from '../services'
import { userActions } from '../constants'

class RegisterComponent extends React.Component {

    constructor(props) {
        super(props)
        this.userService = UserService.instance
    }

    state = {
        username: '',
        password: '',
        confirmPassword: ''
    }

    updateUsername = (event) => this.setState({ username: event.target.value })
    updatePassword = (event) => this.setState({ password: event.target.value })
    updateConfirmPassword = (event) => this.setState({ confirmPassword: event.target.value })

    register = () => {

        if (this.state.password.length < 4 || this.state.password !== this.state.confirmPassword) {
            alert('Invalid')
            return
        }

        const user = {
            username: this.state.username,
            password: this.state.password
        }

        this.userService.registerUser(user)
            .then(user => {
                this.props.setUser(user)
                this.props.history.push('/')
            }, () => console.warn('server error'))

    }

    render() {
        return (
            <div className='jumbotron bg-light'>
                <h1 className='display-3'>Register</h1>
                <div className='form-group row'>
                    <label htmlFor="email" className="col-sm-2 col-form-label">Username</label>
                    <div className="col-sm-10">
                        <input value={this.state.username} onChange={this.updateUsername} className="form-control" id="email" placeholder="Username" />
                    </div>
                </div>
                <div className='form-group row'>
                    <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
                    <div className="col-sm-10">
                        <input value={this.state.password} onChange={this.updatePassword} type="password" className="form-control" id="password" placeholder="Password" />
                    </div>
                </div>
                <div className='form-group row'>
                    <label htmlFor="confirmPassword" className="col-sm-2 col-form-label">Confirm Password</label>
                    <div className="col-sm-10">
                        <input value={this.state.confirmPassword} onChange={this.updateConfirmPassword} type="password" className="form-control" id="confirmPassword"
                            placeholder="Confirm Password" />
                    </div>
                </div>
                <button className='btn btn-block btn-success' onClick={() => this.register()}>
                    Register
                </button>
            </div>
        )
    }

}

RegisterComponent.propTypes = {
    history: PropTypes.object,
    setUser: PropTypes.func
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => (
    {
        setUser: user => dispatch({ type: userActions.SET_USER, user })
    }
)

const Register = connect(mapStateToProps, mapDispatchToProps)(RegisterComponent)
export default Register