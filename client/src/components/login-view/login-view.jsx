import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import { Link } from "react-router-dom";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import PropTypes from 'prop-types';

/**
 * @function LoginView
 * @description Function component, which accepts props and referred as stateless.
 * @param {props} props
 */
export function LoginView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    // const [ register, setRegister ] = useState('false');

    const handleLogin = (e) => {
        e.preventDefault();

        axios.post('https://webflix-api-2019.herokuapp.com/login', {
            Username: username,
            Password: password
        })
        .then(response => {
            const data = response.data;
            props.onLoggedIn(data);
        })
        .catch( e => {
            alert('Username does not exist. Please sign up!');
        });
    };

    return (
        <div className="login-view">
        <Row className="justify-content-center">
        <Col xs={11} sm={8} md={6} className="form-container">
            <Form>
                <Form.Group controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder="Enter username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required/>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required/>
                </Form.Group>
                <Button variant="primary" type="button" onClick={handleLogin}>
                    Login
                </Button>
                <Form.Group controlId='newUser'>
                    <Form.Text>New User? Click
                        <Link to="/register">
                            <Button variant="link">SignUp</Button>
                        </Link>
                    </Form.Text>
                </Form.Group>
            </Form>
        </Col>
        </Row>
        </div>
    );
}
