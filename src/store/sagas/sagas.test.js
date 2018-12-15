import { put, take, call, select, all } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';

import { fetchDataWorker, getMoviesByQueryWatcher } from "./sagas";
import { getQ, getSearchBy } from "../selectors";
import * as actions from '../actions';
import { network } from "../../services/network";

describe('sagas tests', () => {

    describe('sagas workers test', () => {

        describe('fetchDataWorker test', () => {
            const url = `?sortBy=title&sortOrder=asc&searchBy=title}&search=`;
            const generator = cloneableGenerator(fetchDataWorker)(
                network.get,
                url,
                actions.fetchMoviesListByQuery
            );

            test('should send request without errors', () => {
                expect(generator.next().value).toEqual(call(network.get, url));
            });

            test('should data fetch with success', () => {
                const clone = generator.clone();
                const response = { data: { id: 1 } };

                expect(clone.next(response).value).toEqual(put(actions.fetchMoviesListByQuery.success(response)));
            });

            test('should data fetch with error', () => {
                const clone = generator.clone();

                expect(clone.throw(new Error('error')).value).toEqual(put(actions.fetchMoviesListByQuery.failure()));
            })
        });
    });

    describe('sagas watchers test', () => {

        describe('getMoviesByQueryWatcher test', () => {
            const generator = getMoviesByQueryWatcher();
            const q = 'search';
            const searchBy = 'title';

            test('should movies data requested without errors', () => {
                expect(generator.next().value).toEqual(take(actions.GET_MOVIES_BY_QUERY.REQUEST));
                expect(generator.next().value).toEqual(all([select(getQ), select(getSearchBy)]));
                expect(generator.next([q, searchBy]).value).toEqual(
                    call (
                        fetchDataWorker,
                        network.get,
                        `?sortBy=title&sortOrder=asc&searchBy=${searchBy}&search=${q}`,
                        actions.fetchMoviesListByQuery
                    )
                );
            })
        });
    });
});
