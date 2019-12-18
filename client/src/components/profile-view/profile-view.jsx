import React from 'react';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export class ProfileView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: null,
            userDetail: null,
            token: null
        };
    }

    deleteProfile(props) {
        axios.delete(`https://webflix-api-2019.herokuapp.com/users/${props.userDetail.Username}`, {
            headers: { Authorization: `Bearer ${props.token}`}
        })
        .then(response => {
            const data = response.data;
            props.handleLogout();
        })
        .catch(() => {
            console.log('Profile not deleted!');
        });
    };

    render() {
        const { userDetail, token } = this.props;

        if (!userDetail) return null;

        return (
            <div className="profile-view">
            <div className="profile-name">
                <span className="label">Username: </span>
                <span className="value">{userDetail.Username}</span>
            </div>
            <div className="profile-password">
                <span className="label">Password: </span>
                <span className="value" password>{userDetail.Password}</span>
            </div>
            <div className="profile-email">
                <span className="label">Email: </span>
                <span className="value">{userDetail.Email}</span>
            </div>
            <div className="profile-birthday">
                <span className="label">Date of Birth: </span>
                <span className="value">{userDetail.Birthday}</span>
            </div>
            <div className="profile-favorite">
                <span className="label">Favorite Movies: </span>
                <span className="value">{userDetail.Favoritemovies}</span>
            </div>
            <Link to="/">
                <Button variant="link">Back</Button>
                <Button variant="primary" type="button" onClick={(props) => this.deleteProfile(this.props)}>
                    Delete my profile
                </Button>
            </Link>
            </div>
        );
    }
}
