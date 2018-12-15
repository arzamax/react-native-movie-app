import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';

import MoviesList from "../MoviesList";
import { getFavoriteMoviesWithCustomPosters } from "../../store/selectors";

import { styles } from "./styles";

class FavoriteMovies extends PureComponent {

    render() {
        const { favoriteMovies, navigation } = this.props;

        return (
            <ScrollView style={styles.container}>
                <MoviesList
                    navigation={navigation}
                    movies={favoriteMovies}
                />
            </ScrollView>
        )
    }
}

const mapStateToProps = state => ({
    favoriteMovies: getFavoriteMoviesWithCustomPosters(state)
});

export default connect(mapStateToProps)(FavoriteMovies);