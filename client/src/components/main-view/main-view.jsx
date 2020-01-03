import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { setMovies, setUser } from '../../actions/actions';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavItem from 'react-bootstrap/NavItem';
import FormControl from 'react-bootstrap/FormControl';

import MoviesList from '../movies-list/movies-list';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
// import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import  ProfileView  from '../profile-view/profile-view';

export class MainView extends React.Component {

    constructor() {
        super();

        let accessToken = localStorage.getItem('token');

        this.state = {
            // movies: [],
            // selectedMovie: null,
            // users: [],
            user: accessToken ? localStorage.getItem('user') : null,
            // userDetail: null,
            register: false,
            // genre: null,
            // director: null,
            token: accessToken || null
        };

        if (accessToken !== null) {
          this.getMovies(accessToken);
          this.getUser(accessToken);
        }
    }

    onMovieClick(movie) {
        this.setState({
            selectedMovie: movie
        });
    }

    listAllMovies() {
        this.setState({
            selectedMovie: null
        });
    }

    onLoggedIn(authData) {
        this.setState({
            user:  authData.user.Username
        });
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
        this.getUser(authData.token);
    }

    getMovies(token) {
        axios.get('https://webflix-api-2019.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}`}
        })
        .then(response => {
     // Assign the result to the state
            // this.setState({
            //     movies: response.data,
            //     token: token
            // });
            this.props.setMovies(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
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
            this.props.setUser(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    onRegistration() {
        this.setState({
            register: true
        });
    }

    addNewUser(user) {
        this.setState({
            user: user,
            register: false
        });
    }

    handleLogout() {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.open('/client', '_self');
        // this.setState({
        //     user:  null,
        //     token: null
        // });
    }

    render() {

        // const { movies, selectedMovie, users, user, userDetail, register, genre, director, token } = this.state;
        
        let { movies } = this.props;
        let { user, register, token  } = this.state;

        // if (!movies) return <div className="main-view"/>;

        // 1st render: this.state.token === null, console.log(token) => null, componentDidMount => this.setState(token)
        // 2nd render: this.state.token === 'e7hhsdif', console.log(token) => 'e7'

        return (
            <div className="mainview">
                <Router basename="/client">
                    <Route exact path="/" render={() => {
                        if (!user && register === false) {
                            return (
                                <div>
                                    <Navbar bg="dark" variant="dark">
                                    <Nav className="mr-auto">
                                        <Nav.Link className="text-info" href="/client"><h3>Webflix Online Movie World!</h3></Nav.Link>
                                    </Nav>
                                    </Navbar>
                                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} onClick={() => this.onRegistration()}/>
                                </div>
                            );
                        }
                        return ( 
                            <div>
                            <Navbar bg="dark" variant="dark">
                                <Nav className="mr-auto">
                                    <Nav.Link href="/client">Home</Nav.Link>
                                    <Nav.Link href={`/client/users/${user}`}>Profile</Nav.Link>
                                </Nav>
                                <Button variant="outline-info" type="button" onClick={() => this.handleLogout()}>
                                    Logout
                                </Button>
                            </Navbar>
                            <MoviesList movies={movies}/>
                        </div>
                        );
                    }}/>

                    <Route path="/register" render={() => {
                        return (
                                <div>
                                    <Navbar bg="dark" variant="dark">
                                    <Nav className="mr-auto">
                                        <Nav.Link className="text-info" href="/client"><h3>Webflix Online Movie World!</h3></Nav.Link>
                                    </Nav>
                                    </Navbar>
                                    <RegistrationView addNewUser={(user) => this.addNewUser(user)}/>
                                </div>
                            );
                        }
                    }/>

                    <Route path="/movies/:movieId" render={
                        ({match}) => 
                            {
                                return (
                                    <div>
                                        <Navbar bg="dark" variant="dark">
                                        <Nav className="mr-auto">
                                            <Nav.Link href="/client">Home</Nav.Link>
                                            <Nav.Link href={`/client/users/${user}`}>Profile</Nav.Link>
                                        </Nav>
                                        <Button variant="outline-info" type="button" onClick={() => this.handleLogout()}>
                                            Logout
                                        </Button>
                                        </Navbar>
                                        <MovieView movie={movies.find(m => m._id === match.params.movieId)}/>
                                    </div>
                                );
                            }
                    }/>
                    <Route path="/genres/:genreName" render={
                        ({match}) => 
                            {
                                return (
                                    <div>
                                        <Navbar bg="dark" variant="dark">
                                        <Nav className="mr-auto">
                                            <Nav.Link href="/client">Home</Nav.Link>
                                            <Nav.Link href={`/client/users/${user}`}>Profile</Nav.Link>
                                        </Nav>
                                        <Button variant="outline-info" type="button" onClick={() => this.handleLogout()}>
                                            Logout
                                        </Button>
                                        </Navbar>
                                        <GenreView genre={movies.find(g => g.Genre.Name === match.params.genreName)}/>
                                    </div>
                                );
                            }
                    }/>
                    <Route path="/description/:directorName" render={
                        ({match}) => 
                            {
                                return (
                                    <div>
                                        <Navbar bg="dark" variant="dark">
                                        <Nav className="mr-auto">
                                            <Nav.Link href="/client">Home</Nav.Link>
                                            <Nav.Link href={`/client/users/${user}`}>Profile</Nav.Link>
                                        </Nav>
                                        <Button variant="outline-info" type="button" onClick={() => this.handleLogout()}>
                                            Logout
                                        </Button>
                                        </Navbar>
                                        <DirectorView director={movies.find(d => d.Director.Name === match.params.directorName)}/>
                                    </div>
                                );
                            }
                    }/>
                    <Route path="/users/:user" render={
                        ({match}) =>
                            {
                                // when there isn't a user token, that means the user has been logged out
                                // redirect back to Home
                                if (!token) {
                                    return <Redirect to='/client' />
                                }
                                return (
                                    <div>
                                        <Navbar bg="dark" variant="dark">
                                            <Nav className="mr-auto">
                                                <Nav.Link href="/client">Home</Nav.Link>
                                                <Nav.Link href={`/client/users/${user}`}>Profile</Nav.Link>
                                            </Nav>
                                            <Button variant="outline-info" type="button" onClick={() => this.handleLogout()}>
                                                Logout
                                            </Button>
                                        </Navbar>
                                        <ProfileView />
                                    </div>
                                );
                            }
                    }/>
                </Router>
            </div>
        )
    }
}

let mapStateToProps = state => {
    return { movies: state.movies, users: state.users }
}
  
export default connect(mapStateToProps, { setMovies, setUser })(MainView);
// return <ProfileView userDetail={users.find(u => u.Username === match.params.user)}
// handleLogout={() => this.handleLogout()} token={token} movies={movies} />