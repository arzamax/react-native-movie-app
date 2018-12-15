import React, {PureComponent} from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';

import MoviesList from '../MoviesList';
import Search from '../Search/Search';
import Loader from "../../components/Loader";
import { fetchMoviesListByQuery, fetchMoreMovies } from "../../store/actions";
import { getMoviesWithCustomPosters, getQ } from "../../store/selectors";

import { styles } from "./styles";

class Main extends PureComponent {

    componentDidMount() {
        const { movies, requestMovies, q } = this.props;

        if (movies.length === 0 && q === '') {
            requestMovies(q);
        }
    }

    handleEndReached = () => {
        const { hasMoreMovies, offset } = this.props;

        if (hasMoreMovies) {
            const { requestMoreMovies } = this.props;

            requestMoreMovies(offset + 10);
        }
    };

    handleRefreshMoviesList = () => {
        const { requestMovies, q } = this.props;

        requestMovies(q);
    };

    render() {
        const { isLoadingMoreMovies } = this.props;

        return (
            <View style={styles.container}>
                <Search />
                <MoviesList
                    {...this.props}
                    onEndReached={this.handleEndReached}
                    onRefreshMoviesList={this.handleRefreshMoviesList}
                />
                {
                    isLoadingMoreMovies &&
                        <View style={styles.loaderContainer}>
                            <Loader />
                        </View>
                }
            </View>
        )
    }
}

const mapStateToProps = state => ({
    movies: getMoviesWithCustomPosters(state),
    q: getQ(state),
    offset: state.movies.offset,
    isLoadingMoreMovies: state.movies.isLoadingMore,
    hasMoreMovies: state.movies.hasMore
});

export default connect(mapStateToProps, {
    requestMovies: fetchMoviesListByQuery.request,
    requestMoreMovies: fetchMoreMovies.request
})(Main);