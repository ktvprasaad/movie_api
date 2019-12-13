import React from 'react';

export class MovieView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            movie: false
        };
    }

    render() {
        const { movie, onClick } = this.props;

        console.log('props: ', this.props, ' state: ', this.state)

        if (!movie) return null;

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
            <button onClick={() => onClick()}>Back</button>
            </div>
        );
    }
}
