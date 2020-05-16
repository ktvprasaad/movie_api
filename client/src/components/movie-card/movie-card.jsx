import './movie-card.scss';

import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { setMovies, setUser } from '../../actions/actions';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from "react-router-dom";

export class MovieCard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            movie: null,
            user: null,
            token: null,
            isShown: false
        };

        // axios instance
        // keeping it DRY (don't repeat yourself)
        this.moviesAPI = axios.create({
            baseURL: 'https://webflix-api-2019.herokuapp.com',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
    }

    addFavMovie(props) {

        this.moviesAPI.post(`/users/${localStorage.getItem('user')}/movie/${props.movie._id}`,{upsert: true})
        // null is needed for post
        // axios.post(`https://webflix-api-2019.herokuapp.com`, null, {
        //     headers: { Authorization: `Bearer ${props.token}`}
        // })
        .then(response => {
            alert('Movie added to your favorite list.');
        })
        .catch(() => {
            console.log('Movie not updated!');
        });
    };


    setIsShown(state) {
        this.setState({
            isShown: state
        });
    }

    render() {
        const { movie, user, token } = this.props;
        const { isShown } = this.state;
        
        let image=`https://webflix-api-2019.herokuapp.com/img/${movie.ImagePath}`;

        if (!movie) return null;

        return (
            <Card>
            <Card.Img variant="top" src={image} onMouseEnter={() => this.setIsShown(true)}/>
            { isShown && (
                <Card.Body onMouseLeave={() => this.setIsShown(false)}>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Card.Text>{movie.Description}</Card.Text>
                    <Link to={`/movies/${movie._id}`}>
                        <Button class="open" variant="link">Open</Button>
                    </Link>
                    <Button class="add" variant="primary" type="button" onClick={(props) => this.addFavMovie(this.props)}>
                        Add to my Favorite List
                    </Button>
                </Card.Body>
            )}
        </Card>
        );
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired
    }).isRequired
};
