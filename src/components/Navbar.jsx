import React from 'react'
import { Collapse, Navbar, NavbarToggler, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { Link } from 'react-router-dom'

export default class CustomNavbar extends React.Component {

    state = {
        isOpen: false,
        search: 'hello world'
    }

    openNavButton = () => this.setState({ isOpen: !this.state.isOpen })

    search = () => this.context.router.push('/search')

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
                                <Link to="/profile" className="dropdown-item">View Profile</Link>
                                <DropdownItem divider />
                                <Link to="/register" className="dropdown-item">Register</Link>
                                <Link to="/login" className="dropdown-item">Login</Link>
                                <DropdownItem>
                                    Logout
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </ul>
                    <div className="form-inline my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />

                        <Link to={{pathname: '/search', query: {search: this.search}}} className="btn btn-outline-success my-sm-0">Search</Link>
                        {/* <button className="btn btn-outline-success my-sm-0" onClick={() => console.log('hello')}>Search</button> */}
                    </div>
                </Collapse>
            </Navbar>
        )
    }
}