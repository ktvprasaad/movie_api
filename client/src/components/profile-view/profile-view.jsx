import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { setMovies, setUser } from '../../actions/actions';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

import { MovieCard } from '../movie-card/movie-card';

export class ProfileView extends React.Component {

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
                Authorization: `Bearer ${props.token}`
            }
        })

    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
          this.getUser(accessToken);
        }
    }

    getUser(token) {
        axios.get('https://webflix-api-2019.herokuapp.com/users', {
            headers: { Authorization: `Bearer ${token}`}
        })
        .then(response => {
     // Assign the result to the state
            // this.setState({
            //     users: response.data
            // });
            console.log('response user:', response.data)
            this.props.setUser(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
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

        this.moviesAPI.put(`users/${props.userDetail.Username}`,{
            Password: this.state.newPassword,
            Email: this.state.newEmail,
            Birthday: this.state.newBirthday
        })
        .then(response => {
            console.log(response.data);
        })
        .catch(() => {
            console.log('Profile not updated!');
        });
    }

    removeFavoriteMovie(e,favoriteMovie) {

        // let movieId = '5dba3742f90a580f64bd30e3';
        //
        // this.setState({
        //     movieId: e.target.value
        // });

        console.log('delete :', this.props.userDetail.Username, 'favoriteMovie ' , favoriteMovie);

        this.moviesAPI.delete(`/users/${this.props.userDetail.Username}/movie/${favoriteMovie}`)
        .then(response => {
            console.log(response.data);
        })
        .catch(() => {
            console.log('Movie not removed!');
        });
    }

    deleteProfile(props) {
        // axios.delete(`https://webflix-api-2019.herokuapp.com/users/${props.userDetail.Username}`, {
        //     headers: { Authorization: `Bearer ${props.token}`}
        // })
        this.moviesAPI.delete(`users/${props.userDetail.Username}`)
        .then(response => {
            const data = response.data;
            props.handleLogout();
        })
        .catch(() => {
            console.log('Profile not deleted!');
        });
    };

    render() {
        const { userDetail, token, movies, users } = this.state;
        console.log('ProfileView props: ', this.props);
        console.log('ProfileView state: ', this.state);

        // let image=`https://webflix-api-2019.herokuapp.com/img/${userDetail.movie.ImagePath}`;

        if (!userDetail) return null;


        return (
            <div className="profile-view">
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
                    </Form></Col></Row>
                </div>
                <div className="profile-delete">
                    <Link to="/">
                        <Button variant="link">Back</Button>
                        <Button variant="primary" type="button" onClick={(props) => this.deleteProfile(this.props)}>
                            Delete my profile
                        </Button>
                    </Link>
                </div>
                <div className="favoriteMovies">
                    <ListGroup className="list-group-flush" variant="flush">
                       <ListGroup.Item>Favourite Movies:
                        <div>
                           {userDetail.Favoritemovies.length === 0 &&
                             <div className="value">No Favorite Movies have been added</div>
                           }
                           {userDetail.Favoritemovies.length > 0 &&
                             <ul>
                               {userDetail.Favoritemovies.map(Favoritemovie =>
                                 (<li key={Favoritemovie}>
                                   <p className="favoriteMovies">
                                   {
                                     <MovieCard/>
                                    }
                                   <Button variant="secondary" size="sm" onClick={(event) => this.removeFavoriteMovie(event, Favoritemovie)}>
                                     Remove
                                   </Button>
                                   </p>
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

// const mapStateToProps = state => {
//     const { movies } = state;
//     return { movies };
// };

let mapStateToProps = state => {
    return { movies: state.movies, users: state.users }
}

export default connect(mapStateToProps,{setUser})(ProfileView);
//186 <MovieCard key={Favoritemovie} movie={(movies).find(movie => movie._id == Favoritemovie)}
// user={userDetail.Username} token={token}/>

    //    let user = (users).find(user => user.Username = localStorage.getItem('user'));
    //    console.log(user);

    //    if (!user) return null;