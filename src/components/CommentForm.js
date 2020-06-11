import React, { Component } from 'react';
import { Button, Modal, Row, Form, Col } from 'react-bootstrap';
import { LocalForm, Control } from 'react-redux-form';

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        }
    }

    toggleModal = () => {
        this.setState({ isModalOpen: !this.state.isModalOpen })
    }

    handleSubmit = (values) => {
        this.toggleModal();
        console.log(this.props.dishId);
        this.props.postComment(this.props.dishId, typeof (values.rating) == "undefined" ? 1 : values.rating,
            values.comment)
    }

    render() {
        return (
            <div>
                <Button variant="outline-secondary" onClick={this.toggleModal}>
                    <i className="fa fa-edit fa-lg" /> Submit Comment
                </Button>
                <Modal show={this.state.isModalOpen} onHide={this.toggleModal}>
                    <Modal.Header closeButton><Modal.Title>Submit Comment</Modal.Title></Modal.Header>
                    <Modal.Body>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Form.Label column htmlFor="rating" md={12} >Rating</Form.Label>
                                <Col md={12}>
                                    <Control.select model=".rating" name="rating"
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Form.Label column htmlFor="comment" md={12}>Comment</Form.Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment" rows="6"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Button type="submit" color="primary">Submit</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default CommentForm;