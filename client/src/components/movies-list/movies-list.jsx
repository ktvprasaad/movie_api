import React from 'react';
import { connect } from 'react-redux';

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
        filteredMovies = movies.filter(m => m.Title.includes(visibilityFilter));
    }

    if (!movies) return <div class="main-view"/>;

    return <div className="movies-list">
        <VisibilityFilterInput visibilityFilter={visibilityFilter}/>
        {filteredMovies.map(m => <MovieCard key={m._id} movie={m}/>)}
        </div>;
}

export default connect(mapStateToProps)(MoviesList);