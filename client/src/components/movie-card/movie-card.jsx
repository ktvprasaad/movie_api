import './movie-card.scss';

import React from 'react';
// import axios from 'axios';
import PropTypes from 'prop-types';

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
        // this.moviesAPI = axios.create({
        //     baseURL: 'https://webflix-api-2019.herokuapp.com',
        //     headers: {
        //         Authorization: `Bearer ${localStorage.getItem('token')}`
        //     }
        // })
    }

    setIsShown(state) {
        this.setState({
            isShown: state
        });
    }

    render() {
        const { movie } = this.props;
        const { isShown } = this.state;
        
        let image=`https://webflix-api-2019.herokuapp.com/img/${movie.ImagePath}`;

        if (!movie) return null;

        return (
            <Card>
                <Card.Img variant="top" src={image} onMouseEnter={() => this.setIsShown(true)}/>
                { isShown && (
                    <Card.Body onMouseLeave={() => this.setIsShown(false)}>
                        <Card.Title>{movie.Title}</Card.Title>
                        <Card.Text>{movie.Description.substring(0,150)} ...</Card.Text>
                        <Card.Footer>
                           <Link to={`/movies/${movie._id}`}>
                                <Button class="open" variant="link">Know more...</Button>
                            </Link>
                        </Card.Footer>
                    </Card.Body>
                )}
            </Card>
        );
    }
}

/** 
 * static propTypes on MovieCard set to object that contains special values provided as utilities by prop-types module.
 * This values help specify how MovieCard's props should look*
 */
MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired
    }).isRequired
};
