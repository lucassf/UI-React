import React, { Component } from 'react';
import { Card } from 'react-bootstrap';

class Menu extends Component {

    render() {
        const menu = this.props.dishes.map((dish) => {
            return (
                <div key={dish.id} className="col-12 col-md-5 m-1">
                    <Card onClick={() => this.props.onClick(dish.id)}>
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
            </div>
        );
    }
}

export default Menu;