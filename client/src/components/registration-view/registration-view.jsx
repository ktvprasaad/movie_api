import React, { useState } from 'react';
import { MainView } from '../main-view/main-view';

export function RegistrationView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');

    const handleClick = (e) => {
            e.preventDefault();
            console.log(username, password, email);
            // props.onRegistration(username);
            // props.onLoggedIn(username);
            props.onRegistration(username, password, email);
    };

    return (
        <div className="sign-up">
        <h2>Sign Up</h2>
            <form>
                <label>
                    Username:
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </label>
                <label>
                    Email:
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
                </label>
                <button type="button" onClick={handleClick}>Register</button>
            </form>
        </div>
    );
}
