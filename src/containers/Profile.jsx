import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { userActions } from '../constants'
import { UserService } from '../services'

class ProfileComponent extends React.Component {

    constructor(props) {
        super(props)
        this.userService = UserService.instance
    }

    state = {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: '',
        showAlert: false
    }

    componentDidMount() {
        this.userService.profile()
            .then(userProfile => {
                this.userService.findUserById(userProfile.id)
                    .then(user => {
                        user.username !== null && this.setUsername(user.username)
                        user.password !== null && this.setPassword(user.password)
                        user.firstName !== null && this.setFirstName(user.firstName)
                        user.lastName !== null && this.setLastName(user.lastName)
                        user.email !== null && this.setEmail(user.email)
                        this.props.setUser(user)
                    })
            }, () => this.props.history.push('/login'))
    }

    updateUser = () => {
        const user = {
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email
        }
        this.userService.updateUser(this.props.user.id, user)
            .then(newUser => {
                this.props.setUser(newUser)
                this.showAlert()
                setTimeout(() => this.hideAlert(), 3000)
            }, () => console.warn('Error updating user'))
    }

    logout = () => {
        this.userService.logout()
        this.props.history.push('/login')
    }

    showAlert = () => this.setState({ showAlert: true })
    hideAlert = () => this.setState({ showAlert: false })

    setUsername = username => this.setState({ username })
    setPassword = password => this.setState({ password })
    setFirstName = firstName => this.setState({ firstName })
    setLastName = lastName => this.setState({ lastName })
    setEmail = email => this.setState({ email })

    updatePassword = event => this.setState({ password: event.target.value })
    updateFirstName = event => this.setState({ firstName: event.target.value })
    updateLastName = event => this.setState({ lastName: event.target.value })
    updateEmail = event => this.setState({ email: event.target.value })

    render() {
        console.log(this.props.user)
        return (
            <div className='jumbotron'>
                <h1 className="display-3">Profile</h1>
                <p className="lead">Welcome {this.props.user.username}</p>
                <div className="mt-3">
                    <div className="form-group row">
                        <label htmlFor="username" className="col-sm-3 col-md-2 col-form-label lead">Username</label>
                        <div className="col-sm-9 col-md-10">
                            <input value={this.state.username} id='username' className='form-control' readOnly />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="password" className="col-sm-3 col-md-2 col-form-label lead">Password</label>
                        <div className="col-sm-9 col-md-10">
                            <input value={this.state.password} onChange={this.updatePassword} id='password' className='form-control' type='password' />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="firstName" className="col-sm-3 col-md-2 col-form-label lead">First Name</label>
                        <div className="col-sm-9 col-md-10">
                            <input value={this.state.firstName} onChange={this.updateFirstName} id='firstName' className='form-control' />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="lastName" className="col-sm-3 col-md-2 col-form-label lead">Last Name</label>
                        <div className="col-sm-9 col-md-10">
                            <input value={this.state.lastName} onChange={this.updateLastName} id='lastName' className='form-control' />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="email" className="col-sm-3 col-md-2 col-form-label lead">Email</label>
                        <div className="col-sm-9 col-md-10">
                            <input value={this.state.email} onChange={this.updateEmail} id='email' className='form-control' />
                        </div>
                    </div>
                    <button onClick={() => this.updateUser()} className='btn btn-outline-success btn-block mt-2'>
                        Update Profile
                    </button>
                    <button onClick={() => this.logout()} className='btn btn-outline-danger btn-block mt-2'>
                        Logout
                    </button>
                    {this.state.showAlert &&
                        <div className="alert alert-success text-center mt-3" role="alert">
                            Profile Updated!
                        </div>
                    }
                </div>
            </div>
        )
    }

}

ProfileComponent.propTypes = {
    history: PropTypes.object,
    user: PropTypes.object,
    setUser: PropTypes.func
}

const mapStateToProps = state => (
    {
        user: state.user.user
    }
)

const mapDispatchToProps = dispatch => (
    {
        setUser: user => dispatch({ type: userActions.SET_USER, user })
    }
)

const Profile = connect(mapStateToProps, mapDispatchToProps)(ProfileComponent)
export default Profile