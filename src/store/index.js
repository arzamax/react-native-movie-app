import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import { composeWithDevTools } from 'remote-redux-devtools';
import storage from 'redux-persist/lib/storage';

import { rootSaga } from "./sagas/sagas";
import { rootReducer } from "./reducers";

const persistConfig = {
    key: 'root',
    storage
};
const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = composeWithDevTools({ realtime: true });

export const store = createStore(
    persistReducer(persistConfig, rootReducer),
    composeEnhancers(
        applyMiddleware(sagaMiddleware, logger)
    )
);
export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);
