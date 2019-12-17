import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export class ProfileView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: null
        };
    }

    render() {
        const { user } = this.props;

        console.log('Profile props: ', this.props, ' state: ', this.state)

        if (!user) return null;

        return (
            <div className="profile-view">
            <div className="profile-name">
                <span className="label">Name: </span>
                <span className="value">{user.Username}</span>
            </div>
            <Link to="/">
                <Button variant="link">Back</Button>
            </Link>
            </div>
        );
    }
}
