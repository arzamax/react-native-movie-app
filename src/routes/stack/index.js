import React from 'react';
import { createStackNavigator } from 'react-navigation';

import Main from '../../containers/Main';
import DetailMovie from '../../containers/DetailMovie';
import FavoriteMovies from '../../containers/FavoriteMovies';
import DrawerButton from '../../components/DrawerButton';
import FavoriteButton from '../../containers/FavoriteButton';

const moviesNavigatorCreator = initialRoute => {
    const { screen, routeName, title } = initialRoute;

    return createStackNavigator(
        {
            [routeName]: {
                screen,
                navigationOptions: ({ navigation }) => ({
                    headerLeft: (
                        <DrawerButton navigation={navigation} />
                    ),
                    title
                })
            },
            DetailMovie: {
                screen: DetailMovie,
                navigationOptions: ({ navigation }) => ({
                    title: `${navigation.state.params.movie.title}`,
                    headerRight: (
                        <FavoriteButton movie={navigation.state.params.movie} />
                    )
                })
            }
        },
        {
            initialRouteName: routeName
        }
    );
};

export const MoviesNavigator = moviesNavigatorCreator({
    screen: Main,
    routeName: 'Main',
    title: 'Movies'
});
export const FavoriteMoviesNavigator = moviesNavigatorCreator({
    screen: FavoriteMovies,
    routeName: 'FavoriteMovies',
    title: 'Favorite movies'
});