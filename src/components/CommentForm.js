import React, { Component } from 'react';
import { Button, Modal, Row, Form, Col } from 'react-bootstrap';
import { LocalForm, Control, Errors } from 'react-redux-form';

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

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
        this.props.addComment(this.props.dishId, values.rating, values.name, values.comment)
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
                                <Form.Label column htmlFor="name" md={12} >Your Name</Form.Label>
                                <Col md={12} >
                                    <Control.text model=".name" id="name" name="name"
                                        placeholder="Your Name" className="form-control"
                                        validators={{
                                            minLength: minLength(3), maxLength: maxLength(15)
                                        }} />
                                    <Errors className="text-danger" model=".name" show="touched"
                                        messages={{
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be less than 16 characters'
                                        }} />
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