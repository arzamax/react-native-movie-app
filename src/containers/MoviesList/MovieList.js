import React, { PureComponent } from 'react';
import {
    View,
    Image,
    Text,
    FlatList,
    TouchableOpacity,
    RefreshControl
} from 'react-native';

import Loader from "../../components/Loader/index";
import FavoriteButton from '../FavoriteButton/index';

import { styles } from "./styles";

export default class MoviesList extends PureComponent {

    state = {
        refreshing: false
    };

    componentDidUpdate(prevProps, prevState) {
        const { movies } = this.props;

        if (prevProps.movies !== movies && prevState.refreshing) {
            this.setState({
                refreshing: false
            })
        }
    }

    handleClickMovieDetail = movie => {
        const { navigation } = this.props;

        navigation.navigate('DetailMovie', { movie });
    };

    handleRefreshMoviesList = () => {
        const { onRefreshMoviesList } = this.props;

        this.setState({
            refreshing: true
        });
        onRefreshMoviesList();
    };

    renderMoviesListItem = ({ item, index }) =>
        <TouchableOpacity
            onPress={() => this.handleClickMovieDetail(item)}
            style={
                [
                    styles.movieContainer,
                    ...[ index === 0 ? styles.movieFirstChild : [] ]
                ]
            }
        >
            <FavoriteButton
                movie={item}
                isMovieCard={true}
            />
            <View
                style={styles.movie}
            >
                <Image
                    style={styles.movieImage}
                    source={{uri: item.poster_path}}
                />
                <View style={styles.movieInfo}>
                    <Text style={styles.movieTitle}>{item.title}</Text>
                    <Text style={styles.movieGenres}>
                        {
                            item.genres
                                .map((genre, index) =>
                                    `${genre}${index !== item.genres.length - 1 ? ', ' : ''}` )
                                .join('')
                        }
                    </Text>
                    <View style={styles.movieRating}>
                        <Text style={styles.movieRatingText}>{item.vote_average}</Text>
                    </View>
                    <Text style={styles.movieYear}>{item.release_date}</Text>
                </View>
            </View>
        </TouchableOpacity>;

    render() {
        const {
            movies,
            onEndReached,
            onRefreshMoviesList
        } = this.props;
        const { refreshing } = this.state;
        const movieListRenderer = movies ?
            movies.length > 0 ?
                <FlatList
                    data={movies}
                    keyExtractor={(item, index) => `${index}`}
                    renderItem={this.renderMoviesListItem}
                    onEndReachedThreshold={1}
                    onEndReached={onEndReached || null}
                    refreshControl={
                        onRefreshMoviesList ?
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={this.handleRefreshMoviesList}
                            /> :
                            null
                    }
                /> :
                <Text style={styles.notFoundText}>Not found</Text> :
            <Loader />;

        return (
            <View style={styles.container}>
                {movieListRenderer}
            </View>
        );
    }
}
