const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

const generateRequestTypes = action =>
    [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
        acc[type] = `${action}_${type}`;

        return acc;
    }, {});

const act = (type, payload) => ({
    type,
    payload
});

const getFetchActions = constants => ({
    request: req => act(constants.REQUEST, req),
    success: res => act(constants.SUCCESS, res),
    failure: () => act(constants.FAILURE)
});

// Actions

export const GET_MOVIES_BY_QUERY = generateRequestTypes('GET_MOVIES_BY_QUERY');
export const GET_MOVIE = generateRequestTypes('GET_MOVIE');
export const GET_MORE_MOVIES = generateRequestTypes('GET_MORE_MOVIES');
export const SET_SEARCH_BY = 'SET_SEARCH_BY';
export const SET_FAVORITE_MOVIE = 'SET_FAVORITE_MOVIE';
export const SET_MOVIE_POSTER = 'SET_MOVIE_POSTER';

export const fetchMoviesListByQuery = getFetchActions(GET_MOVIES_BY_QUERY);
export const fetchMovie = getFetchActions(GET_MOVIE);
export const fetchMoreMovies = getFetchActions(GET_MORE_MOVIES);
export const setSearchBy = label => act(SET_SEARCH_BY, label);
export const setFavoriteMovie = movie => act(SET_FAVORITE_MOVIE, movie);
export const setMoviePoster = posterData => act(SET_MOVIE_POSTER, posterData);
