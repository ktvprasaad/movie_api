import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export function RegistrationView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');

    const handleClick = (e) => {
        e.preventDefault();
        console.log(username, password, email);
        console.log(props);
        /* Send a request to the server for authentication */
        props.addNewUser(username);
    };

    return (
        <div className="registration-view">
        <Row className="justify-content-center">
        <Col xs={11} sm={8} md={6} className="form-container">
        <h2>Sign Up</h2>
            <Form>
                <Form.Group controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        value={username}
                        placeholder="Enter username"
                        onChange={e => setUsername(e.target.value)} required />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={e => setPassword(e.target.value)} required />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="text"
                        value={email}
                        placeholder="Enter Emailid"
                        onChange={e => setEmail(e.target.value)} required />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleClick}>Register</Button>
            </Form>
            </Col>
            </Row>
        </div>
    );
}
