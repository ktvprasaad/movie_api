import './movies-list.scss';

import React from 'react';
import { connect } from 'react-redux';

import Col from 'react-bootstrap/Col';
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';

const mapStateToProps = state => {
    const { movies, visibilityFilter } = state;
    return { visibilityFilter } ;
};

function MoviesList(props) {
    const { movies, visibilityFilter } = props;

    let filteredMovies = movies;

    if (visibilityFilter !== '') {
        filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
    }

    if (!movies) return <div class="main-view"/>;

    return <div> 
        <VisibilityFilterInput visibilityFilter={visibilityFilter}/>
            <div className="movies-list">
                {filteredMovies.map(m => <MovieCard key={m._id} movie={m}/>)}
            </div>
        </div>
}

export default connect(mapStateToProps)(MoviesList);