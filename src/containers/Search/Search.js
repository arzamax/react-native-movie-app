import React, {PureComponent} from 'react';
import { connect } from 'react-redux';
import {
    View,
    TextInput
} from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';

import { fetchMoviesListByQuery, setSearchBy } from '../../store/actions';
import { getQ } from "../../store/selectors";
import debounce from 'lodash/debounce';

import { styles } from "./styles";

const searchByTabsData = ['title', 'genres'];

class Search extends PureComponent {

    state = {
        selectedSearchByIndex: 0,
        searchValue: ''
    };

    componentDidMount() {
        const { q } = this.props;

        this.setState({
            searchValue: q
        })
    }

    componentWillUnmount() {
        this.changeSearchValue.cancel();
    }

    changeSearchValue = debounce(value => {
        const { requestMoviesList } = this.props;

        requestMoviesList(value)
    }, 600);

    handleChangeSearchInput = value => {
        this.setState({
            searchValue: value
        });
        this.changeSearchValue(value);
    };

    handlePressSearchByTab= index => {
        const { setSearchBy, requestMoviesList } = this.props;
        const { searchValue } = this.state;

        this.setState({
            selectedSearchByIndex: index
        });
        setSearchBy(searchByTabsData[index]);

        if (searchValue) {
            requestMoviesList(searchValue);
        }
    };

    render() {
        const { searchValue, selectedSearchByIndex } = this.state;

        return (
            <View style={styles.searchContainer}>
                <TextInput
                    onChangeText={this.handleChangeSearchInput}
                    value={searchValue}
                    style={styles.searchInput}
                />
                <SegmentedControlTab
                    onTabPress={this.handlePressSearchByTab}
                    values={['title', 'genres']}
                    selectedIndex={selectedSearchByIndex}
                    tabsContainerStyle={styles.tabContainerStyle}
                    tabTextStyle={styles.tabTextStyle}
                    activeTabStyle={styles.activeTabStyle}
                    tabStyle={styles.tabStyle}
                    tabBadgeContainerStyle={styles.tabBadgeContainerStyle}
                />
            </View>
        );
    }
}

const mapStateToProps = state => ({
   q: getQ(state)
});

export default connect(mapStateToProps, {
    requestMoviesList: fetchMoviesListByQuery.request,
    setSearchBy
})(Search);