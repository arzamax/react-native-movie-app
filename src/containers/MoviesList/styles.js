import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    movieFirstChild: {
        marginTop: 0
    },
    movieContainer: {
        position: 'relative',
        marginTop: 10,
        paddingHorizontal: 10,
        paddingBottom: 10,
        paddingTop: 45,
        backgroundColor: '#4982b0'
    },
    movieFavoriteButton: {
        position: 'absolute',
        right: 10,
        top: 10,
        fontSize: 25
    },
    movieFavoriteButtonActive: {
        color: '#fffb72'
    },
    movie: {
        flex: 1,
        flexDirection: 'row',
    },
    movieImage: {
        width: 90,
        height: 140
    },
    movieInfo: {
        flex: 1,
        marginLeft: 10
    },
    movieGenres: {
        marginTop: 10,
        color: '#ffffff'
    },
    movieTitle: {
        fontWeight: 'bold',
        color: '#ffffff'
    },
    movieRating: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        borderWidth: 2,
        borderColor: '#ffffff',
        borderRadius: 20
    },
    movieRatingText: {
        color: '#ffffff'
    },
    movieYear: {
        marginTop: 10,
        color: '#ffffff',
        fontStyle: 'italic'
    },
    notFoundText: {
        marginTop: 30,
        textAlign: 'center'
    }
});