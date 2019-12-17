import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export class GenreView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            movie: null,
            genre: null
        };
    }

    render() {
        const { movie, genre, onClick } = this.props;

        console.log('Genre props: ', this.props, ' state: ', this.state)

        if (!genre) return null;

        return (
            <div className="genre-view">
            <div className="genre-name">
                <span className="label">Genre: </span>
                <span className="value">{genre.Genre.Name}</span>
            </div>
            <div className="genre-description">
                <span className="label">Description: </span>
                <span className="value">{genre.Genre.Description}</span>
            </div>
            <Link to="/">
                <Button variant="link">Back</Button>
            </Link>
            </div>
        );
    }
}
