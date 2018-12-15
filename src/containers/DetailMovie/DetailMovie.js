import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
    ScrollView,
    View,
    Image,
    Text
} from 'react-native';

import Loader from '../../components/Loader/Loader';
import { getMovieWithCustomPoster } from "../../store/selectors";
import UploadPosterButton from '../UploadPosterButton';
import { fetchMovie } from "../../store/actions";

import { styles } from "./styles";

class DetailMovie extends PureComponent {

    componentDidMount() {
        const { requestMovie, navigation: { state: { params } } } = this.props;

        if (params && params.movie) {
            requestMovie(params.movie.id);
        }
    }

    render() {
        const { movie } = this.props;

        return (
            movie ?
                <ScrollView style={styles.movieContainer}>
                    <View style={styles.movie}>
                        <Image
                            source={{uri: movie.poster_path}}
                            style={{width: 90, height: 140}}
                        />
                        <UploadPosterButton movieId={movie.id}/>
                        <View style={styles.movieInfo}>
                            <Text style={styles.movieTitle}>{movie.title}</Text>
                            <Text style={styles.movieDescription}>{movie.overview}</Text>
                        </View>
                    </View>
                </ScrollView> :
                <Loader />
        )
    }
}

const mapStateToProps = state => ({
    movie: getMovieWithCustomPoster(state)
});

export default connect(mapStateToProps, { requestMovie: fetchMovie.request })(DetailMovie);