import './director-view.scss';
import '../button/button.scss';
import PropTypes from 'prop-types';

import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import { MovieCard } from '../movie-card/movie-card';


/**
 * @class DirectorView
 * @extends React.Component
 */
export class DirectorView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            // movie: null,
            // director: null,
            isShown: false
        };
    }

    setIsShown(state) {
        this.setState({
            isShown: state
        });
    }

    render() {
        const { director, movies } = this.props;
        const { isShown } = this.state;

        console.log('Director props: ', this.props, ' state: ', this.state)
        // let image=`https://webflix-api-2019.herokuapp.com/img/${movie.ImagePath}`;
        if (!director) return null;

        return (
            <div className="director-view">
                <div className="col-left">
                    <Link to="" onClick={() => history.back()}>
                        <Button id="back" variant="link">Back</Button>
                    </Link>
                    <div className="desc">
                        <div className="director-name">
                            <span className="label">Name: </span>
                            <span className="value">{director.Director.Name}</span>
                        </div>
                        <div className="director-bio">
                            <span className="label">Bio: </span>
                            <span className="value">{director.Director.Bio}</span>
                        </div>
                        <div className="director-birth">
                            <span className="label">Birth: </span>
                            <span className="value">{director.Director.Birth.substring(0,10)}</span>
                        </div>
                        { director.Director.Death && 
                            <div className="director-death">
                                <span className="label">Death: </span>
                                <span className="value">{director.Director.Death.substring(0,10)}</span>
                            </div>
                        }
                    </div>
                </div>
                <div className="col-right">
                <Container>
                    <h4 className="mt-4">More movies from {director.Director.Name}</h4>
                    <div className="d-flex row mt-3 ml-1">
                            {movies.map(movie => {
                                if (movie.Director.Name === director.Director.Name) {
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

DirectorView.propTypes = {
    director: PropTypes.shape({
      Name: PropTypes.string,
      Bio: PropTypes.string,
      Birth: PropTypes.string,
      Death: PropTypes.string
    }).isRequired
};
