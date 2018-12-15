import { put, call, take, fork, select, all } from 'redux-saga/effects';

import * as actions from '../actions';
import { network } from '../../services/network';
import { getSearchBy, getQ, getMovieId } from "../selectors";

// Workers

export function* fetchDataWorker(
    network,
    url,
    { success, failure }
) {
    try {
        const res = yield call(network, url);
        yield put(success(res));
    }
    catch (e) {
        yield put(failure());
    }
}

// Watchers

export function* getMoviesByQueryWatcher() {
    while (true) {
        yield take(actions.GET_MOVIES_BY_QUERY.REQUEST);
        const [ q, searchBy ] = yield all([
            select(getQ),
            select(getSearchBy)
        ]);
        yield call(
            fetchDataWorker,
            network.get,
            `?sortBy=title&sortOrder=asc&searchBy=${searchBy}&search=${q}`,
            actions.fetchMoviesListByQuery
        );
    }
}

function* getMovieWatcher() {
    while (true) {
        yield take(actions.GET_MOVIE.REQUEST);
        const id = yield select(getMovieId);
        yield call(fetchDataWorker, network.get, `/${id}`, actions.fetchMovie);
    }
}

function* getMoreMoviesWatcher() {
    while (true) {
        const { payload: offset } = yield take(actions.GET_MORE_MOVIES.REQUEST);
        const [ q, searchBy ] = yield all([
            select(getQ),
            select(getSearchBy)
        ]);
        yield call(
            fetchDataWorker,
            network.get,
            `?sortBy=title&sortOrder=asc&offset=${offset}&searchBy=${searchBy}&search=${q}`,
            actions.fetchMoreMovies
        );
    }
}

// Root Saga

export function* rootSaga() {
    yield all([
        fork(getMoviesByQueryWatcher),
        fork(getMovieWatcher),
        fork(getMoreMoviesWatcher)
    ])
}



