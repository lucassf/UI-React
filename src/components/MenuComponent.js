import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import DishDetail from './DishdetailComponent'

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDish: null
        };
    }

    renderDish(dish) {
        return (
            <DishDetail dish={dish} />
        );
    }

    onDishSelect(dish) {
        this.setState({ selectedDish: dish });
    }

    render() {
        const menu = this.props.dishes.map((dish) => {
            return (
                <div key={dish.id} className="col-12 col-md-5 m-1">
                    <Card onClick={() => this.onDishSelect(dish)}>
                        <Card.Img width="100%" src={dish.image} alt={dish.name} />
                        <Card.ImgOverlay>
                            <Card.Title>{dish.name}</Card.Title>
                        </Card.ImgOverlay>
                    </Card>
                </div>
            )
        });
        return (
            <div className="container">
                <div className="row">
                    {menu}
                </div>
                {this.renderDish(this.state.selectedDish)}
            </div>
        );
    }
}

export default Menu;