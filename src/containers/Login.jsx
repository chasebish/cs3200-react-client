import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { UserService } from '../services'
import { userActions } from '../constants'

class LoginComponent extends React.Component {

    constructor(props) {
        super(props)
        this.userService = UserService.instance
    }

    state = {
        username: '',
        password: ''
    }

    updateUsername = event => this.setState({ username: event.target.value })
    updatePassword = event => this.setState({ password: event.target.value })

    login = () => {

        const user = {
            username: this.state.username,
            password: this.state.password
        }

        this.userService.loginUser(user)
            .then(user => {
                this.props.setUser(user)
                this.props.history.push('/')
            }, () => console.warn('Could not log in'))

    }

    render() {
        return (
            <div className='jumbotron bg-light'>
                <h1 className='display-3'>Login</h1>
                <div className='form-group row'>
                    <label htmlFor="username" className="col-sm-2 col-form-label">Username</label>
                    <div className="col-sm-10">
                        <input value={this.state.username} onChange={this.updateUsername} className="form-control" id="username" placeholder="Username" />
                    </div>
                </div>
                <div className='form-group row'>
                    <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
                    <div className="col-sm-10">
                        <input value={this.state.password} onChange={this.updatePassword} type="password" className="form-control" id="password" placeholder="Password" />
                    </div>
                </div>
                <button className='btn btn-block btn-success' onClick={() => this.login()}>
                    Login
                </button>
            </div>
        )
    }

}

LoginComponent.propTypes = {
    history: PropTypes.object,
    setUser: PropTypes.func
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => (
    {
        setUser: user => dispatch({ type: userActions.SET_USER, user })
    }
)

const Login = connect(mapStateToProps, mapDispatchToProps)(LoginComponent)
export default Login