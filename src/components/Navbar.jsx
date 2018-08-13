import React from 'react'
import PropTypes from 'prop-types'
import { Collapse, Navbar, NavbarToggler, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { userActions } from '../constants'
import { UserService } from '../services'

class CustomNavbarComponent extends React.Component {

    constructor(props) {
        super(props)
        this.userService = UserService.instance
    }

    componentDidMount() {
        this.userService.profile()
            .then(user => {
                console.log('NAVBAR', user)
                this.props.setUser(user)
            }, () => console.log('NO USER'))
    }

    state = {
        isOpen: false,
    }

    openNavButton = () => this.setState({ isOpen: !this.state.isOpen })

    logout = () => {
        this.userService.logout()
            .then(() => {
                this.props.logoutUser()
                this.props.history.push('/login')
            }, () => console.warn('LOGOUT ERROR'))
    }

    render() {
        return (
            <Navbar className='mb-3' color="dark" dark expand="md">
                <Link to="/" className="navbar-brand">Rotten Potatoes</Link>
                <NavbarToggler onClick={this.openNavButton} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="/request" className="nav-link">Request a Video</Link>
                        </li>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Profile
                            </DropdownToggle>
                            <DropdownMenu right>
                                {this.props.user.username &&
                                    <Link to="/profile" className="dropdown-item">View Profile</Link>}
                                {!this.props.user.username &&
                                    <div>
                                        <Link to="/register" className="dropdown-item">Register</Link>
                                        <Link to="/login" className="dropdown-item">Login</Link>
                                    </div>
                                }
                                {this.props.user.username &&
                                    <div>
                                        <DropdownItem divider />
                                        <button className='dropdown-item' onClick={() => this.logout()}>Logout</button>
                                    </div>
                                }
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </ul>
                    <div className="form-inline my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        <Link to='/search' className="btn btn-outline-success my-sm-0">Search</Link>
                    </div>
                </Collapse>
            </Navbar>
        )
    }
}

CustomNavbarComponent.propTypes = {
    history: PropTypes.object,
    logoutUser: PropTypes.func,
    setUser: PropTypes.func,
    user: PropTypes.object
}

const mapStateToProps = state => (
    {
        user: state.user.user
    }
)

const mapDispatchToProps = dispatch => (
    {
        logoutUser: () => dispatch({ type: userActions.LOGOUT_USER }),
        setUser: user => dispatch({ type: userActions.SET_USER, user })
    }
)

const CustomNavbar = withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomNavbarComponent))
export default CustomNavbar