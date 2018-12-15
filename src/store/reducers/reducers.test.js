import { movies } from "./movies";
import { initialState as moviesInitialState } from "./movies";
import {
    GET_MORE_MOVIES,
    GET_MOVIES_BY_QUERY,
    SET_FAVORITE_MOVIE,
    SET_MOVIE_POSTER,
    SET_SEARCH_BY
} from "../actions";

describe('reducers test', () => {

    describe('movies reducer test', () => {

        test('should return state with search query', () => {
            expect(movies(moviesInitialState, {
                type: GET_MOVIES_BY_QUERY.REQUEST,
                payload: 'query'
            })).toEqual({
                ...moviesInitialState,
                q: 'query',
                data: null
            });
        });

        test('should return state with movies data after fetch success', () => {
            expect(movies(moviesInitialState, {
                type: GET_MOVIES_BY_QUERY.SUCCESS,
                payload: {
                    data: {
                        data: [
                            '1',
                            '2',
                            '3'
                        ],
                        total: 3
                    }
                }
            })).toEqual({
                ...moviesInitialState,
                hasMore: false,
                data: [
                    '1',
                    '2',
                    '3'
                ]
            });
        });

        test('should return state with movies data after fetch failure', () => {
            expect(movies(moviesInitialState, {
                type: GET_MOVIES_BY_QUERY.FAILURE
            })).toEqual({
                ...moviesInitialState,
                data: []
            })
        });

        test('should return state with searchBy label', () => {
            expect(movies(moviesInitialState, {
                type: SET_SEARCH_BY,
                payload: 'title'
            })).toEqual({
                ...moviesInitialState,
                searchBy: 'title'
            })
        });

        test('should return state after getting non-existing favorite movie', () => {
            expect(movies(moviesInitialState, {
                type: SET_FAVORITE_MOVIE,
                payload: {
                    id: 1
                }
            })).toEqual({
                ...moviesInitialState,
                favorites: [{ id: 1 }]
            })
        });

        test('should return state after getting existing favorite movie', () => {
            expect(movies(
                {
                    ...moviesInitialState,
                    favorites: [{ id: 1 }]
                },
                {
                    type: SET_FAVORITE_MOVIE,
                    payload: {
                        id: 1
                    }
                }
            )).toEqual({
                ...moviesInitialState,
                favorites: []
            })
        });

        test('should return state after getting more movies request', () => {
            expect(movies(moviesInitialState, {
                type: GET_MORE_MOVIES.REQUEST
            })).toEqual({
                ...moviesInitialState,
                isLoadingMore: true
            })
        });

        test('should return state with additional movies data after fetch success', () => {
            expect(movies(
                {
                    ...moviesInitialState,
                    data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
                },
                {
                type: GET_MORE_MOVIES.SUCCESS,
                payload: {
                    data: {
                        data: [
                            '11',
                            '12',
                            '13'
                        ]
                    }
                }
            })).toEqual({
                ...moviesInitialState,
                data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'],
                offset: 10,
                hasMore: false,
                isLoadingMore: false
            })
        });

        test('should return state with additional movies data after fetch failure', () => {
            expect(movies(
                {
                    ...moviesInitialState,
                    isLoadingMore: true
                },
                { type: GET_MORE_MOVIES.FAILURE }
            )).toEqual({
                ...moviesInitialState,
                isLoadingMore: false
            })
        });

        test('should return state after adding new custom poster', () => {
            expect(movies(moviesInitialState, {
                type: SET_MOVIE_POSTER,
                payload: { 1: 'path' }
            })).toEqual({
                ...moviesInitialState,
                customPosters: { 1: 'path' }
            })
        })
    });
});