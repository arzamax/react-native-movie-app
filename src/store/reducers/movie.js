import * as actions from '../actions';

const initialState = {
    id: null,
    data: null
};

export const movie = (state = initialState, action) => {
    switch (action.type) {
        case actions.GET_MOVIE.REQUEST:
            return {
                ...state,
                id: action.payload,
                data: null
            };
        case actions.GET_MOVIE.SUCCESS:
            return {
                ...state,
                data: action.payload.data
            };
        case actions.GET_MOVIE.FAILURE:
            return {
                ...state,
                data: null
            };
        default:
            return state;
    }
};