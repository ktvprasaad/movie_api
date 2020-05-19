import './movie-view.scss';
import PropTypes from 'prop-types';
import axios from 'axios';

import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export class MovieView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};

        // axios instance
        // keeping it DRY (don't repeat yourself)
        this.moviesAPI = axios.create({
            baseURL: 'https://webflix-api-2019.herokuapp.com',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
    }

    addFavMovie() {
        const  { movie } = this.props;
        console.log(movie._id);

        this.moviesAPI.post(`/users/${localStorage.getItem('user')}/movie/${movie._id}`)
        // null is needed for post
        // axios.post(`https://webflix-api-2019.herokuapp.com`, null, {
        //     headers: { Authorization: `Bearer ${props.token}`}
        // })
        .then(response => {
            alert(`${movie.Title} added to your favorite list.`);
        })
        .catch((error) => {
            alert(`${movie.Title} not added to your favorite list!` + error);
        });
    };

    render() {
        const { movie } = this.props;

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
                    <div>
                        <Button class="add" variant="primary" type="button" onClick={(props) => this.addFavMovie(this.props)}>
                            Add to my Favorite List
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

MovieView.propTypes = {
    movie: PropTypes.shape({
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
      .isRequired
  };
