import React from 'react';
import { Card, Breadcrumb, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl'
import { FadeTransform, Fade, Stagger } from 'react-animation-components'

function RenderComments({ comments, postComment, dishId }) {
    const reactComments = comments.map((comment) => {
        var date = (new Date(comment.createdAt)).toLocaleString('default', { month: 'short', day: 'numeric', year: 'numeric' });
        return (
            <Fade in key={comment._id}>
                <div>
                    <li>
                        {comment.comment}
                    </li>
                    <li className="fa fa-star">
                        {comment.rating}
                    </li>
                    <p></p>
                    <li>
                        -- {comment.author.firstname} {comment.author.lastname} , {date}
                    </li>
                    <p></p>
                </div>
            </Fade>
        )
    });
    return (
        <div>
            <h4>Comments</h4>
            <ul className="list-unstyled">
                <Stagger in>
                    {reactComments}
                </Stagger>
            </ul>
            <CommentForm postComment={postComment} dishId={dishId} />
        </div>
    );
}

function RenderDish({ dish, favorite, postFavorite }) {
    return <Card>
        <Card.Img width="100%" src={baseUrl + dish.image} alt={dish.name}></Card.Img>
        <Card.ImgOverlay>
            <Button outline color="primary" onClick={() => {
                favorite ? console.log('Already favorite') : postFavorite(dish._id)
            }}>
                {
                    favorite ?
                        <span className="fa fa-heart" /> :
                        <span className="fa fa-heart-o" />
                }
            </Button>
        </Card.ImgOverlay>
        <Card.Body>
            <Card.Title>{dish.name}</Card.Title>
            <Card.Text>{dish.description}</Card.Text>
        </Card.Body>
    </Card>
}

function DishDetail(props) {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    if (props.errMsg) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMsg}</h4>
                </div>
            </div>
        );
    }
    if (props.dish == null)
        return (
            <div></div>
        );
    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <Breadcrumb.Item><Link to='/home'>Home</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to='/menu'>Menu</Link></Breadcrumb.Item>
                    <Breadcrumb.Item active>{props.dish.name}</Breadcrumb.Item>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <FadeTransform in transformProps={{
                        exitTransform: 'scale(0.5) translateY(-50%)'
                    }}>
                        <RenderDish dish={props.dish} favorite={props.favorite}
                            postFavorite={props.postFavorite} />
                    </FadeTransform>
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderComments comments={props.comments}
                        postComment={props.postComment}
                        dishId={props.dish._id} />
                </div>
            </div>
        </div>
    );
}

export default DishDetail;