import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            movies: null,
            selectedMovie: null,
            user: null,
            register: false
        };
    }

    //One of the "hooks" available in the React component
    componentDidMount() {
        axios.get('https://webflix-api-2019.herokuapp.com/movies')
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

    onMovieClick(movie) {
        this.setState({
            selectedMovie: movie
        });
    }

    onLoggedIn(props) {
        console.log('LoginForm ', props.user)
        this.setState({
            user: props.user
        });
    }

    onRegistration(username, password, email) {
        console.log(username, password, email);
        this.setState({
            user: username
        });
    }

    render() {
        // if the state isn't initialized, this will throw on runtime
        // before the data is initially loaded
        const { movies, selectedMovie, user, register } = this.state;

        if (!user) {
            return (
                <LoginView />
            );
        };

        // Before the movies have been loaded
        if (!movies) return <div className="main-view"/>;

        return (
            <div className="main-view">
            {selectedMovie
                ? <MovieView movie={selectedMovie}/>
                : movies.map(movie => (
                    <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)}/>
                ))
            }
            </div>
        );
    }
}
