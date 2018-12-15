import { combineReducers } from 'redux';

import { movies } from './movies';
import { movie } from './movie';

export const rootReducer = combineReducers({
    movies,
    movie
});