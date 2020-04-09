import React from 'react';
import { Card } from 'react-bootstrap';

function RenderComments({dish}) {
    const comments = dish.comments.map((comment) => {
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
                {comments}
            </ul>
        </div>
    );
}

function DishDetail(props) {
    if (props.dish == null)
        return (
            <div></div>
        );
    return (
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <Card>
                        <Card.Img width="100%" src={props.dish.image} alt={props.dish.name}></Card.Img>
                        <Card.Body>
                            <Card.Title>{props.dish.name}</Card.Title>
                            <Card.Text>{props.dish.description}</Card.Text>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderComments dish={props.dish}/>
                </div>
            </div>
        </div>
    );
}

export default DishDetail;