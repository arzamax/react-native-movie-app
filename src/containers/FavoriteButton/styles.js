import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    favoriteButton: {
        fontSize: 40,
        marginRight: 10
    },
    favoriteButtonMovieCard: {
        position: 'absolute',
        right: 0,
        top: 10,
        zIndex: 2
    },
    favoriteButtonActive: {
        color: '#ffaa36'
    }
});