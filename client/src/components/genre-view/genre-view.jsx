import './genre-view.scss';
import '../button/button.scss';
// import '../movie-card/movie-card.scss';

import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

import { MovieCard } from '../movie-card/movie-card';

/**
 * @class GenreView
 * @extends React.Component
 */
export class GenreView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isShown: false
        };
    }

    setIsShown(state) {
        this.setState({
            isShown: state
        });
    }

    render() {
        const { movies, genre } = this.props;
        const { isShown } = this.state;

        console.log('Genre props: ', this.props, ' state: ', this.state)

        if (!genre) return null;

        return (
            <div className="genre-view">
                <div className="col-left">
                    <Link to="" onClick={() => history.back()}>
                        <Button id="back" variant="link">Back</Button>
                    </Link>
                    <div className='desc'>
                        <div className="genre-name">
                            <span className="label">Genre: </span>
                            <span className="value">{genre.Genre.Name}</span>
                        </div>
                        <div className="genre-description">
                            <span className="label">Description: </span>
                            <span className="value">{genre.Genre.Description}</span>
                        </div>
                    </div>
                </div>
                <div className="col-right">
                    <Container>
                    <h4>More {genre.Genre.Name} movies!</h4>
                        <div className="d-flex row mt-3 ml-1">
                            {movies.map(movie => {
                                if (movie.Genre.Name === genre.Genre.Name) {
                                    return (
                                        <ul>
                                            <li key={movie._id}>
                                                <MovieCard movie={movie} />
                                            </li>
                                        </ul>
                                    );
                                }
                            })}
                        </div>
                    </Container>
                </div>
            </div>
        );
    }
}
