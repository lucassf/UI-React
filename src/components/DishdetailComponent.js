import React, { Component } from 'react';
import { Card } from 'react-bootstrap';

class DishDetail extends Component {
    renderComments() {
        const comments = this.props.dish.comments.map((comment) => {
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

    render() {
        if (this.props.dish == null)
            return (
                <div></div>
            );
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <Card>
                            <Card.Img width="100%" src={this.props.dish.image} alt={this.props.dish.name}></Card.Img>
                            <Card.Body>
                                <Card.Title>{this.props.dish.name}</Card.Title>
                                <Card.Text>{this.props.dish.description}</Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        {this.renderComments()}
                    </div>
                </div>
            </div>
        );
    }
}

export default DishDetail;