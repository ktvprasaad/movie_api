import React, { useState } from 'react';
import { RegistrationView } from '../registration-view/registration-view';

export function LoginView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ register, setRegsiter ] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // const { username, password } = this.state;
        console.log(username, password);
        /* Send a request to the server for authentication */
        /* then call props.onLoggedIn(username) */
        props.onLoggedIn(username);
    };

    const handleRegister = (e) => {
        e.preventDefault();
        setRegsiter(true);
        console.log('register');
    }

    return (
        <div className="sign-in">
        <h2>Sign in</h2>
        <form>
            <label>
                Username:
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </label>
            <button type="button" onClick={handleLogin}>Login</button>
        </form>
        <h2>New User</h2>
        <button type="button" onClick={handleRegister}>Register</button>
        </div>
    );
}
