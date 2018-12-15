import { createSelector } from 'reselect';

const getCustomPosters = state => state.movies.customPosters;
const getMovies = state => state.movies.data;
const getMovie = state => state.movie.data;
const getFavoriteMovies = state => state.movies.favorites;
export const getQ = state => state.movies.q;
export const getSearchBy = state => state.movies.searchBy;
export const getMovieId = state => state.movie.id;

const getMoviesDataWithCustomPosters = selector => createSelector(
    selector,
    getCustomPosters,
    (movies, customPosters) => {
        if (movies) {

            return movies.map(item => {
                if (customPosters.hasOwnProperty(item.id)) {

                    return {
                        ...item,
                        poster_path: customPosters[item.id]
                    }
                }

                return item;
            })
        }

        return movies;
    }
);

export const getMoviesWithCustomPosters = getMoviesDataWithCustomPosters(getMovies);
export const getFavoriteMoviesWithCustomPosters = getMoviesDataWithCustomPosters(getFavoriteMovies);

export const getMovieWithCustomPoster = createSelector(
    getMovie,
    getCustomPosters,
    (movie, customPosters) => {
        if (movie && customPosters.hasOwnProperty(movie.id)) {

            return { ...movie, poster_path: customPosters[movie.id] }
        }

        return movie;
    }
);

export const getFavoriteMoviesIds = createSelector(
    getFavoriteMovies,
    movies => movies.map(item => item.id)
);
