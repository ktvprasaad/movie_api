import './profile-view.scss';
import React from 'react';
import PropTypes from 'prop-types';
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

    updateProfile() {

        this.moviesAPI.put(`users/${this.props.user}`,{
            Password: this.state.newPassword,
            Email: this.state.newEmail,
            Birthday: this.state.newBirthday
        })
        .then(response => {
            alert('Profile udpated!');
        })
        .then(response => {
            document.location.reload(true);
        })
        .catch(() => {
            console.log('Profile not updated!');
        });
    }

    removeFavoriteMovie(e,favoriteMovie) {

        this.moviesAPI.delete(`/users/${this.props.user}/movie/${favoriteMovie}`)
        .then(response => {
            alert('Movie removed from your favorite list.')
        })
        .then(response => {
            document.location.reload(true);
        })
        .catch(() => {
            console.log('Movie not removed!');
        });
    }

    deleteProfile() {
        // axios.delete(`https://webflix-api-2019.herokuapp.com/users/${props.userDetail.Username}`, {
        //     headers: { Authorization: `Bearer ${props.token}`}
        // })
        this.moviesAPI.delete(`users/${this.props.user}`)
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
        const { movies, users, user } = this.props;

        let userDetail;
        let favoriteList;

        if (users !== null ) {
            userDetail = users.find(u => u.Username == user);
            favoriteList = movies.filter(movie => userDetail.Favoritemovies.includes(movie._id));
        }

        if (!userDetail) return null;

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
                        <Button variant="primary" type="button" onClick={() => this.updateProfile()}>
                            Update my profile
                        </Button>
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
                           {userDetail.Favoritemovies.length === 0 &&
                             <div className="value">Not Added Your Favorite Movies Yet!</div>
                           }
                           {userDetail.Favoritemovies.length > 0 &&  movies.length !== 0 &&
                             <ul>
                               {favoriteList.map(favMovie =>
                                 (<li key={favMovie._id}>
                                    <MovieCard key={favMovie._id} movie={(movies).find(movie => movie._id == favMovie._id)}
                                       />
                                   <Button id="remove" variant="secondary" size="sm" onClick={(event) => this.removeFavoriteMovie(event, favMovie._id)}>
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

ProfileView.propTypes = {
    users: PropTypes.shape({
      _id: PropTypes.string,
      Username: PropTypes.string,
      Password: PropTypes.string,
      Birthday: PropTypes.date
    }),
    movies: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string,
        Title: PropTypes.string,
        ImagePath: PropTypes.string,
        Description: PropTypes.string,
        Genre: PropTypes.shape({
          Name: PropTypes.string,
          Description: PropTypes.string
        }),
        Director: PropTypes.shape({
          Name: PropTypes.string,
          Bio: PropTypes.string,
          Birth: PropTypes.date,
          Death: PropTypes.date
        }),
        Featured: PropTypes.boolean,
        Actors: PropTypes.array
      })
    ).isRequired
  }