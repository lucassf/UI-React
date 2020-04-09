import React, { Component } from 'react';
import Menu from './MenuComponent';
import Header from './HeaderComponent'
import Footer from './FooterComponent'
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
                <Header />
                <Menu dishes={this.state.dishes} onClick={(dishID) => this.onDishSelect(dishID)} />
                <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDishID)[0]} />
                <Footer />
            </div>
        );
    }
}

export default MainComponent;
