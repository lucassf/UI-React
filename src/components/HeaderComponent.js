import React, { Component } from 'react';
import { Navbar, Nav, NavItem, Jumbotron, Button, Modal, Form } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        }
    }

    toggleModal = () => { this.setState({ isModalOpen: !this.state.isModalOpen }) }
    handleLogin = (event) => {
        this.toggleModal();
        alert("Username: " + this.username.value + "\nPassword: " +
            this.password.value + "\nRemember: " + this.remember.checked);
        event.preventDefault();            
    }

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
                        <Nav className="ml-auto">
                            <Nav.Item>
                                <Button outline onClick={this.toggleModal}>
                                    <span className="fa fa-sign-in fa-lg" /> Login
                                </Button>
                            </Nav.Item>
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
                <Modal show={this.state.isModalOpen} onHide={this.toggleModal}>
                    <Modal.Header closeButton>Login</Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.handleLogin}>
                            <Form.Group>
                                <Form.Label htmlFor="username">Username</Form.Label>
                                <Form.Control type="text" id="username" name="username"
                                    ref={(input) => this.username = input} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label htmlFor="password">Password</Form.Label>
                                <Form.Control type="password" id="password" name="password"
                                    ref={(input) => this.password = input} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Check>
                                    <Form.Check.Input type="checkbox" name="remember"
                                        ref={(input) => this.remember = input} />
                                    <Form.Check.Label>Remember me</Form.Check.Label>
                                </Form.Check>
                            </Form.Group>
                            <Button type="submit" value="submit" color="bg-primary">Login</Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </>
        )
    }
}

export default Header;
