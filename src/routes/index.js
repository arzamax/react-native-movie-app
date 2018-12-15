import React from 'react';
import { createDrawerNavigator } from 'react-navigation';

import { MoviesNavigator, FavoriteMoviesNavigator } from "./stack";

const RootNavigator = createDrawerNavigator(
    {
        Movies: {
            screen: MoviesNavigator,
            navigationOptions: {
                title: 'Movies'
            }
        },
        FavoriteMovies: {
            screen: FavoriteMoviesNavigator,
            navigationOptions: {
                title: 'Favorite movies'
            }
        }
    },
    {
        initialRouteName: 'Movies'
    }
);

export default RootNavigator;