import React from 'react';
import TestRenderer from 'react-test-renderer';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { TextInput } from 'react-native';

import { Search } from "./Search";

describe('<Search />', () => {

    test('should input change without errors', () => {
        const output = TestRenderer.create(
            <Search
                q='props'
            />
        );

        output.getInstance().handleChangeSearchInput('value');
        expect(output.root.findByType(TextInput).props.value).toEqual('value');
    });

    test('should select tab without errors', () => {
        const setSearchBy = jest.fn();
        const requestMoviesList = jest.fn();
        const output = TestRenderer.create(
            <Search
                q='props'
                setSearchBy={setSearchBy}
                requestMoviesList={requestMoviesList}
            />
        );

        output.getInstance().handlePressSearchByTab(1);
        expect(output.root.findByType(SegmentedControlTab).props.selectedIndex).toEqual(1);
    })
});