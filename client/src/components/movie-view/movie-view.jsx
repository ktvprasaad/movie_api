import React from 'react';

import { MainView } from '../main-view/main-view';

export class MovieView extends React.Component {

    constructor() {
        super();

        this.state = {
            movies: false
        };
    }

    clickHandler() {
        this.setState({
            movies: true
        })
    }

    render() {
        const { movie, onClick } = this.props;
        const { movies } = this.state;

        console.log(this.state);

        if (!movie) return null;

        // To render all movies on click of the 'Back' button
        if (movies) {
            return (
                <div/>
            );
        }

    	let image=`https://webflix-api-2019.herokuapp.com/img/${movie.ImagePath}`;

        return (
            <div className="movie-view">
            <img className="movie-poster" src={image} />
            <div className="movie-title">
                <span className="label">Title: </span>
                <span className="value">{movie.Title}</span>
            </div>
            <div className="movie-description">
                <span className="label">Description: </span>
                <span className="value">{movie.Description}</span>
            </div>
            <div className="movie-genre">
                <span className="label">Genre: </span>
                <span className="value">{movie.Genre.Name}</span>
            </div>
            <div className="movie-director">
                <span className="label">Director: </span>
                <span className="value">{movie.Director.Name}</span>
            </div>
            <button onClick = {() => this.clickHandler()}>Back</button>
            </div>
        );
    }
}
