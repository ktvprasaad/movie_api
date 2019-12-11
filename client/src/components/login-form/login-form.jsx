import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import PropTypes from 'prop-types';
import { MainView } from '../main-view/main-view';

export function LoginForm(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    // const userLogin = [
    //   {
    //     user: props.username
    //   }
    // ];

    const handleLogin = (e) => {
        e.preventDefault();
        // const { username, password } = this.state;
        console.log(username, password);
        props = {
            username: username,
            password: password
        };
        console.log(props);
        /* Send a request to the server for authentication */
        /* then call props.onLoggedIn(username) */

    };

    if (!username) {
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
            </div>
        )};

    return <MainView onLoggedIn={props => this.onLoggedIn(props)}/>
    
}
