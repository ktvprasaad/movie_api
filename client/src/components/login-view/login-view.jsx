import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import PropTypes from 'prop-types';

export function LoginView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    // const [ register, setRegister ] = useState('false');

    const handleLogin = (e) => {
        e.preventDefault();
        // const { username, password } = this.state;
        console.log(username, password);
        // const { username } = this.props;
        console.log(props);
        /* Send a request to the server for authentication */
        /* then call props.onLoggedIn(username) */
        // const { username } = this.props;
        props.onLoggedIn(username);
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
                    <Form.Text>New User? Click<Button id='registerButton' onClick={() => props.onClick()}>SignUp</Button>
                    </Form.Text>
                </Form.Group>
            </Form>
        </Col>
        </Row>
        </div>
    );
}
// LoginView.propTypes = {
//   onLoggedIn: PropTypes.func.isRequired,
//   onClick: PropTypes.func.isRequired
// };
// <Form.Text>New User? Click <Button id='registerButton' onClick={handleSignUp}>SignUp</Button>
