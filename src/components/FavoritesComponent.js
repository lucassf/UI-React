import React from 'react';
import { Media, Breadcrumb, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent'
import { baseUrl } from '../shared/baseUrl'

function RenderMenuItem({ dish, deleteFavorite }) {
    return (
        <Media tag="li">
            <Media left="true" middle="true">
                <img src={baseUrl + dish.image} alt={dish.name} />
            </Media>
            <Media.Body className="ml-5">
                <h5>{dish.name}</h5>
                <p>{dish.description}</p>
                <Button outline color="danger" onClick={() => deleteFavorite(dish._id)}>
                    <span className="fa fa-times"></span>
                </Button>
            </Media.Body>
        </Media>);
}

const Favorites = (props) => {
    if (props.favorites.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    if (props.favorites.errMsg) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.favorites.errMsg}</h4>
                </div>
            </div>
        );
    }
    if (!props.favorites.favorites)
        return (
            <div className="container">
                <div className="row">
                    <h4>You have no favorites</h4>
                </div>
            </div>
        )
    const favorites = props.favorites.favorites.dishes.map((dish) => {
        return (
            <div key={dish._id} className="col-12 col-md-5 m-1">
                <RenderMenuItem dish={dish} deleteFavorite={props.deleteFavorite} />
            </div>
        )
    });
    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <Breadcrumb.Item><Link to='/home'>Home</Link></Breadcrumb.Item>
                    <Breadcrumb.Item active>My Favorites</Breadcrumb.Item>
                </Breadcrumb>
                <div className="col-12">
                    <h3>My Favorites</h3>
                    <hr />
                </div>
            </div>
            <div className="row">
                {favorites}
            </div>
        </div>
    );
}

export default Favorites;