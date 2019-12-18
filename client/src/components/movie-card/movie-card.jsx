import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from "react-router-dom";

export class MovieCard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            movies: [],
            movie: null,
            users: [],
            user: null
        };
    }

    addFavMovie(props) {
        console.log('target : ', props);
        axios.post(`https://webflix-api-2019.herokuapp.com/users/${props.user}/movies/${props.movie._id}`)
        .then(response => {
            console.log(response.data);
        })
        .catch(() => {
            console.log('Movie not updated!');
        });
    };

    render() {
        const { user, movie } = this.props;

        let image=`https://webflix-api-2019.herokuapp.com/img/${movie.ImagePath}`;
        return (
          <Card style={{ width: "16rem" }}>
            <Card.Img variant="top" src={image} />
            <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>{movie.Description}</Card.Text>
                <Link to={`/movies/${movie._id}`}>
                    <Button variant="link">Open</Button>
                </Link>
                <Button variant="primary" type="button" onClick={(props) => this.addFavMovie(this.props)}>
                    Add to favorie List
                </Button>
            </Card.Body>
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
