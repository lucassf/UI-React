import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';
import DishDetail from './DishdetailComponent';

class MainComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dishes: DISHES,
            selectedDishID: null
        };
    }

    onDishSelect(dishID) {
        this.setState({ selectedDishID: dishID });
    }

    render() {
        return (
            <div>
                <Navbar bg="dark" variant="dark">
                    <div className="container">
                        <Navbar.Brand href="/">Ristorant Con Fusion</Navbar.Brand>
                    </div>
                </Navbar>
                <Menu dishes={this.state.dishes} onClick={(dishID) => this.onDishSelect(dishID)} />
                <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDishID)[0]} />
            </div>
        );
    }
}

export default MainComponent;
