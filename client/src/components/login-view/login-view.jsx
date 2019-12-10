import React from 'react';

import { LoginForm } from '../login-form/login-form';
import { RegistrationView } from '../registration-view/registration-view';

export class LoginView extends React.Component {

    constructor() {
        super();

        this.state = {
            signIn: false,
            signUp: false
        };

        this.handleSignIn = this.handleSignIn.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
    }

    handleSignIn(e) {
        this.setState({
            signIn: true,
            signUp: false
        });
    }

    handleSignUp(e) {
        this.setState({
            signIn: false,
            signUp: true
        });
    }

    render() {

        const { signIn, signUp } = this.state;
        const handleSignIn = this.handleSignIn;
        const handleSignUp = this.handleSignUp;

        if (!signIn && !signUp) {
            return (
                <div className='loginView'>
                    <h2>Welcome to WebFlix Online Movie!!</h2>
                    <button type="button" onClick={handleSignIn}>SignIn</button>
                    <button type="button" onClick={handleSignUp}>SignUp</button>
                </div>
            );
        }

        if (signIn) return <LoginForm/>

        if (signUp) return <RegistrationView/>
    }
}
