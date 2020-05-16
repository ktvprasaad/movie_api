import './movie-view.scss';

import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export class MovieView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            movie: false
        };
    }

    render() {
        const { movie, onClick } = this.props;

        console.log('Movie props: ', this.props, ' state: ', this.state)

        if (!movie) return null;

    	let image=`https://webflix-api-2019.herokuapp.com/img/${movie.ImagePath}`;

        return (
            <div className="movie-view">
                <Link to="/">
                    <Button variant="link">Back</Button>
                </Link>
                <div className="col-left">
                    <img className="movie-poster" src={image} />
                </div>
                <div className="col-right">
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
                        <Link to={`/genres/${movie.Genre.Name}`}>
                            <Button variant="link">Genre</Button>
                        </Link>
                    </div>
                    <div className="movie-director">
                        <span className="label">Director: </span>
                        <span className="value">{movie.Director.Name}</span>
                        <Link to={`/description/${movie.Director.Name}`} movie={movie}>
                            <Button variant="link">Director</Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}
