import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    searchInput: {
        width: '45%'
    },
    tabContainerStyle: {
        width: '45%'
    },
    tabStyle: {
        height: 30,
        borderColor: '#4982b0'
    },
    activeTabStyle: {
        backgroundColor: '#4982b0'
    },
    tabTextStyle: {
        color: '#4982b0'
    },
    tabBadgeContainerStyle: {
        borderRadius: 0
    },
});