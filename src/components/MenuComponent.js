import React from 'react';
import { Card, Breadcrumb } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {Loading} from './LoadingComponent'

function RenderMenuItem({ dish, onClick }) {
    return (
        <Card>
            <Link to={`/menu/${dish.id}`}>
                <Card.Img width="100%" src={dish.image} alt={dish.name} />
                <Card.ImgOverlay>
                    <Card.Title>{dish.name}</Card.Title>
                </Card.ImgOverlay>
            </Link>
        </Card>);
}

const Menu = (props) => {
    if (props.dishes.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    if (props.dishes.errMsg) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMsg}</h4>
                </div>
            </div>
        );
    }
    const menu = props.dishes.dishes.map((dish) => {
        return (
            <div key={dish.id} className="col-12 col-md-5 m-1">
                <RenderMenuItem dish={dish} />
            </div>
        )
    });
    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <Breadcrumb.Item><Link to='/home'>Home</Link></Breadcrumb.Item>
                    <Breadcrumb.Item active>Menu</Breadcrumb.Item>
                </Breadcrumb>
                <div className="col-12">
                    <h3>Menu</h3>
                    <hr />
                </div>
            </div>
            <div className="row">
                {menu}
            </div>
        </div>
    );
}

export default Menu;