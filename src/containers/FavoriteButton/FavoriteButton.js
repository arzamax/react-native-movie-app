import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Vibration } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { getFavoriteMoviesIds } from "../../store/selectors";
import { setFavoriteMovie } from "../../store/actions";

import { styles } from "./styles";

class FavoriteButton extends PureComponent {

    handleClickAddMovieToFavorites = () => {
        const { setFavoriteMovie, movie } = this.props;

        setFavoriteMovie(movie);
        Vibration.vibrate(500);
    };

    render() {
        const { movie, favoriteMoviesIds, isMovieCard } = this.props;

        return(
            <MaterialIcons
                name='star'
                style={
                    [
                        styles.favoriteButton,
                        ...[ isMovieCard ? styles.favoriteButtonMovieCard : [] ],
                        ...[ favoriteMoviesIds.includes(movie.id) ? styles.favoriteButtonActive : [] ]
                    ]
                }
                onPress={this.handleClickAddMovieToFavorites}
            />
        )
    }
}

const mapStateToProps = state => ({
    favoriteMoviesIds: getFavoriteMoviesIds(state)
});

export default connect(mapStateToProps, { setFavoriteMovie })(FavoriteButton);