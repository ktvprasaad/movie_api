import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route } from "react-router-dom";
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

export class MainView extends React.Component {

    constructor() {
        super();

        this.state = {
            movies: null,
            selectedMovie: null,
            user: null,
            register: false
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
    }
    // 
    // getMovies(token){
    //
    //         headers: {Authorization: `Bearer ${token}`}
    //     })
    //     .then(response => {
    //         this.setSate({
    //             movies: response.data
    //         });
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     });
    // }

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

    render() {
        // if the state isn't initialized, this will throw on runtime
        // before the data is initially loaded
        const { movies, selectedMovie, user, register } = this.state;

        // if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
        if (!user && register === false) {
             return <LoginView onClick={() => this.onRegistration()} onLoggedIn={user => this.onLoggedIn(user)} />;
        };

        if (register) {
            return <RegistrationView addNewUser={(user) => this.addNewUser(user)} />;
        };

        // Before the movies have been loaded
        if (!movies) return <div className="main-view"/>;

        return (
            <div className="main-view">
            <Navbar bg="dark" variant="dark">
              <Nav className="mr-auto">
                <Nav.Link href="#">Home</Nav.Link>
                <Nav.Link href="#">Movies</Nav.Link>
                <Nav.Link href="#">MyFavourite</Nav.Link>
              </Nav>
              <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-info">Search</Button>
              </Form>
            </Navbar>
            <Nav className="mr-auto">
                {selectedMovie
                    ? <MovieView movie={selectedMovie} onClick={() => this.listAllMovies()}/>
                    : movies.map(movie => (
                        <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)}/>
                    ))
                }
            </Nav>
            </div>
        );
    }
}
