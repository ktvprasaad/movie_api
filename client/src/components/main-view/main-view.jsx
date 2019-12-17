import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavItem from 'react-bootstrap/NavItem';
import FormControl from 'react-bootstrap/FormControl';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { ProfileView } from '../profile-view/profile-view';

export class MainView extends React.Component {

    constructor() {
        super();

        this.state = {
            movies: [],
            selectedMovie: null,
            users: null,
            user: null,
            userDetail: null,
            register: false,
            genre: null,
            director: null
        };
    }

    //One of the "hooks" available in the React component
    componentDidMount() {
      let accessToken = localStorage.getItem('token');
      if (accessToken !== null) {
        this.setState({
          user: localStorage.getItem('user')
        });
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
        console.log(authData);
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
            this.setState({
                movies: response.data
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    getUser(token) {
        axios.get('https://webflix-api-2019.herokuapp.com', {
            headers: { Authorization: `Bearer ${token}`}
        })
        .then(response => {
     // Assign the result to the state
            this.setState({
                users: response.data
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    onRegistration() {
        console.log('onRegistration');
        this.setState({
            register: true
        });
    }

    addNewUser(user) {
        console.log(user);
        this.setState({
            user: user,
            register: false
        });
    }

    handleLogout() {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.setState({
            user:  null
        });
    }

    render() {

        const { movies, selectedMovie, users, user, userDetail, register, genre, director } = this.state;

        let username = user;
        console.log('UserDetail ', userDetail,' : ', 'user:', user ,' movies: ', movies);

        // if (!movies) return <div className="main-view"/>;

        return (
            <div className="mainview">
                <Navbar bg="dark" variant="dark">
                     <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href={`/users/${username}`}>Profile</Nav.Link>
                     </Nav>
                     <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-info">Search</Button>
                     </Form>
                     <Button variant="outline-info" type="button" onClick={() => this.handleLogout()}>
                        Logout
                     </Button>
                </Navbar>
                <Router>
                    <Route exact path="/" render={() => {
                        if (!user && register === false) {
                            return <LoginView onLoggedIn={user => this.onLoggedIn(user)} onClick={() => this.onRegistration()}/>;
                        }
                        return movies.map(m => <MovieCard key={m._id} movie={m}/>)
                    }}/>
                    <Route path="/register" render={() => {
                        return <RegistrationView addNewUser={(user) => this.addNewUser(user)}/>}
                    }/>
                    <Route path="/movies/:movieId" render={({match}) => <MovieView movie={movies.find(m => m._id === match.params.movieId)}/>}/>
                    <Route path="/genres/:genreName" render={({match}) => <GenreView genre={movies.find(g => g.Genre.Name === match.params.genreName)}/>}/>
                    <Route path="/description/:directorName" render={({match}) => <DirectorView director={movies.find(d => d.Director.Name === match.params.directorName)}/>}/>
                    <Route path="/users/:username" render={({match}) => <ProfileView userDetail={users.find(u => u.Username === "Jack")}/>}/>
                </Router>
            </div>
        )
    }
}
