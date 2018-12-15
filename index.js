import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import App from './src/containers/App/App';
import { store, persistor } from './src/store'

const AppWithStore = () =>
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>;

AppRegistry.registerComponent('MoviesApp', () => AppWithStore);
