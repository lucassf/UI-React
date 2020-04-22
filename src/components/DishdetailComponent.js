import React from 'react';
import { Card, Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm';
import { Loading } from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl'

function RenderComments({ comments, postComment, dishId }) {
    const reactComments = comments.map((comment) => {
        var date = (new Date(comment.date)).toLocaleString('default', { month: 'short', day: 'numeric', year: 'numeric' });
        return (
            <div key={comment.id}>
                <li>
                    {comment.comment}
                </li>
                <p></p>
                <li>
                    -- {comment.author} , {date}
                </li>
                <p></p>
            </div>
        )
    });
    return (
        <div>
            <h4>Comments</h4>
            <ul className="list-unstyled">
                {reactComments}
            </ul>
            <CommentForm postComment={postComment} dishId={dishId} />
        </div>
    );
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
                    <Card>
                        <Card.Img width="100%" src={baseUrl + props.dish.image} alt={props.dish.name}></Card.Img>
                        <Card.Body>
                            <Card.Title>{props.dish.name}</Card.Title>
                            <Card.Text>{props.dish.description}</Card.Text>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderComments comments={props.comments}
                        postComment={props.postComment}
                        dishId={props.dish.id} />
                </div>
            </div>
        </div>
    );
}

export default DishDetail;