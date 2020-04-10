import React, { Component } from 'react';
import { Navbar, Nav, NavItem, Jumbotron } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

class Header extends Component {

    render() {
        return (
            <>
                <Navbar collapseOnSelect="true" bg="dark" variant="dark" expand="md" fixed="top">
                    <Navbar.Brand className="mr-auto" href="/">
                        <img src="assets/images/logo.png" height="30" width="41"
                            alt="Ristorante Con Fusion" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <NavItem>
                                <NavLink className="nav-link" to="/home">
                                    <span className="fa fa-home fa-lg"></span> Home
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to="/aboutus">
                                    <span className="fa fa-info fa-lg"></span> About Us
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to="/menu">
                                    <span className="fa fa-list fa-lg"></span> Menu
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to="/contactus">
                                    <span className="fa fa-address-card fa-lg"></span> Contact Us
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>Ristorant Con Fusion</h1>
                                <p>We take inspiration from the World's best cuisines,
                                and create a unique fusion experience. Our lipsmacking
                                    creations will tickle your culinary senses!</p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
            </>
        )
    }
}

export default Header;
