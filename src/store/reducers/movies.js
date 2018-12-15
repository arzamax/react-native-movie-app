import * as actions from '../actions';

export const initialState = {
    data: [],
    favorites: [],
    q: '',
    searchBy: 'title',
    offset: 0,
    hasMore: true,
    isLoadingMore: false,
    customPosters: {}
};

export const movies = (state = initialState, action) => {
    switch (action.type) {
        case actions.GET_MOVIES_BY_QUERY.REQUEST:
            return {
                ...state,
                data: null,
                offset: 0,
                q: action.payload
            };
        case actions.GET_MOVIES_BY_QUERY.SUCCESS:
            return {
                ...state,
                hasMore: action.payload.data.total >= 10,
                data: action.payload.data.data
            };
        case actions.GET_MOVIES_BY_QUERY.FAILURE:
            return {
                ...state,
                data: []
            };
        case actions.SET_SEARCH_BY:
            return {
                ...state,
                searchBy: action.payload
            };
        case actions.SET_FAVORITE_MOVIE:
            const { payload: movie } = action;

            return {
                ...state,
                favorites: state.favorites.some(item => item.id === movie.id) ?
                    state.favorites.filter(item => item.id !== movie.id) :
                    [...state.favorites, movie]
            };
        case actions.GET_MORE_MOVIES.REQUEST:
            return {
                ...state,
                isLoadingMore: true
            };
        case actions.GET_MORE_MOVIES.SUCCESS:
            const data = action.payload.data.data;

            return {
                ...state,
                data: [...state.data, ...data],
                offset: state.offset + 10,
                hasMore: data.length >= 10,
                isLoadingMore: false
            };
        case actions.GET_MORE_MOVIES.FAILURE:
            return {
                ...state,
                isLoadingMore: false
            };
        case actions.SET_MOVIE_POSTER:
            const { payload: customPoster } = action;

            return {
                ...state,
                customPosters: { ...state.customPosters, ...customPoster }
            };
        default:
            return state;
    }
};