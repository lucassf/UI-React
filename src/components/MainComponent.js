import React, { Component } from 'react';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { DISHES } from '../shared/dishes';
import DishDetail from './DishdetailComponent';
import {Switch, Route, Redirect} from 'react-router-dom';

class MainComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dishes: DISHES
        };
    }

    render() {
        const HomePage = () => {
            return (
                <Home />
            );
        };
        return (
            <div>
                <Header />
                <Switch>
                    <Route path="/home" component={HomePage} />
                    <Route exact path="/menu">
                        <Menu dishes={this.state.dishes} />
                    </Route>
                    <Redirect to="/home" />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default MainComponent;
