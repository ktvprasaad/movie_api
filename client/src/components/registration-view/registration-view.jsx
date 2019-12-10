import React, { useState } from 'react';

export function RegistrationView(props) {

    const handleClick = (e) => {
            e.preventDefault();
            console.log(username, password, email);
            // props.onLoggedIn(username);
            props.addNewUser(username, password, email);
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
                <input type="text" value={email} onChange={e => setPassword(e.target.value)} />
            </label>
            <button type="button" onClick={handleClick}>Register</button>
        </form>
        </div>
    );
}
