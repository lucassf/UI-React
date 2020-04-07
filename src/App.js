import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'react-bootstrap';
import Menu from './components/MenuComponent';
import { DISHES } from './shared/dishes';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dishes: DISHES
    };
  }

  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <div className="container">
            <Navbar.Brand href="/">Ristorant Con Fusion</Navbar.Brand>
          </div>
        </Navbar>
        <Menu dishes={this.state.dishes} />
      </div>
    );
  }
}

export default App;
