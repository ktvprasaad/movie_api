import './profile-view.scss'
import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { setMovies, setUser, setFavorites } from '../../actions/actions';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

import { MovieCard } from '../movie-card/movie-card';
// import { MoviesList } from '../movies-list/movies-list';


class ProfileView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: null,
            userDetail: null,
            token: null,
            movies: [],
            newPassword: null,
            newEmail: null,
            newBirthday: null,
            movieId: null,
            movie: null
        };

        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onBirthdayChange = this.onBirthdayChange.bind(this);

        this.moviesAPI = axios.create({
            baseURL: 'https://webflix-api-2019.herokuapp.com',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
    }

    onPasswordChange(event) {
        this.setState({
            newPassword: event.target.value
        });
    }

    onEmailChange(event) {
        this.setState({
            newEmail: event.target.value
        });
    }

    onBirthdayChange(event) {
        this.setState({
            newBirthday: event.target.value
        });
    }

    updateProfile(props) {

        this.moviesAPI.put(`users/${this.state.userDetail.Username}`,{
            Password: this.state.newPassword,
            Email: this.state.newEmail,
            Birthday: this.state.newBirthday
        })
        .then(response => {
            alert('Profile udpated!');
        })
        .catch(() => {
            console.log('Profile not updated!');
        });
    }

    removeFavoriteMovie(e,favoriteMovie) {

        this.moviesAPI.delete(`/users/${this.state.userDetail.Username}/movie/${favoriteMovie}`)
        .then(response => {
            alert('Movie removed from your favorite list.')
        })
        .catch(() => {
            console.log('Movie not removed!');
        });
    }

    deleteProfile() {
        // axios.delete(`https://webflix-api-2019.herokuapp.com/users/${props.userDetail.Username}`, {
        //     headers: { Authorization: `Bearer ${props.token}`}
        // })
        this.moviesAPI.delete(`users/${this.state.userDetail.Username}`)
        .then(response => {
            alert('Profile deleted!');
            const data = response.data;
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            window.open('/client', '_self');
        })
        .catch(() => {
            console.log('Profile not deleted!');
        });
    };

    render() {
        const { userDetail, token } = this.state;
        const { movies, users } = this.props;

        if (users !== null ) {
            this.state.userDetail = users.find(u => u.Username == localStorage.getItem('user'));
        }
        
       // let image=`https://webflix-api-2019.herokuapp.com/img/${userDetail.movie.ImagePath}`;

        if (!this.state.userDetail) return null;

        return (
            <div className="profile-view">
                <Link to="/">
                    <Button variant="link">Back</Button>
                </Link>
                <div className="profileUpdate-view">
                    <Row className="justify-content-center">
                    <Col xs={11} sm={8} md={6} className="form-container">
                    <Form>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter New Password"
                                value={this.state.newPassword}
                                onChange={this.onPasswordChange}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={this.state.newEmail}
                                placeholder="Enter New Email Id"
                                onChange={this.onEmailChange}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Birthday</Form.Label>
                            <Form.Control
                                type="text"
                                value={this.state.newBirthday}
                                placeholder="Enter New Date of Birth"
                                onChange={this.onBirthdayChange}/>
                        </Form.Group>
                        <Link to="/">
                            <Button variant="primary" type="button" onClick={(props) => this.updateProfile(this.props)}>
                                Update my profile
                            </Button>
                        </Link>
                        <div className="profile-delete">
                            <Button variant="light" type="button" onClick={() => this.deleteProfile()}>
                                Delete my profile
                            </Button>
                        </div>
                    </Form></Col></Row>
                </div>

                <div className="favoriteMovies">
                    <ListGroup className="list-group-flush" variant="flush">
                       <ListGroup.Item>My Favourite Movies!
                        <div>
                           {this.state.userDetail.Favoritemovies.length === 0 &&
                             <div className="value">Not Added Your Favorite Movies Yet!</div>
                           }
                           {this.state.userDetail.Favoritemovies.length > 0 &&  movies.length !== 0 &&
                             <ul>
                               {this.state.userDetail.Favoritemovies.map(Favoritemovie =>
                                 (<li key={Favoritemovie}>
                                    <MovieCard key={Favoritemovie} movie={(movies).find(movie => movie._id == Favoritemovie)}
                                       user={this.state.userDetail.Username} token={token}/>
                                   <Button id="remove" variant="secondary" size="sm" onClick={(event) => this.removeFavoriteMovie(event, Favoritemovie)}>
                                     Remove
                                   </Button>
                                 </li>)
                               )}
                             </ul>
                           }
                         </div>
                       </ListGroup.Item>
                    </ListGroup>
                </div>
            </div>
        );
    }
}

let mapStateToProps = state => {
    return { movies: state.movies, users: state.users, favorites: state.favorites }
}

export default connect(mapStateToProps,{setMovies, setUser, setFavorites})(ProfileView);