import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import FilteredTenantPage from './TenantsPage';

import type { NavigationState } from 'react-native-tab-view/types';

import FAB from 'react-native-fab';
import Snackbar from 'react-native-snackbar-component';

type Route = {
    key: string,
    title: string,
};

type State = NavigationState<Route>;


export default class TenantsWrapper extends PureComponent<void, *, State> {
    static title = 'Scrollable top bar';
    static appbarElevation = 0;

    state: State = {
        index: 0,
        routes: [
            { key: '1', title: 'ABC', site:'ABC' },
            { key: '2', title: 'Mganka', site: 'Mganka' },
            { key: '3', title: 'Sipha', site:'Siphakamile' },
            { key: '4', title: 'Oslo', site:'Oslo' },
        ],
        navigation: this.props.navigation,
    };

    _handleIndexChange = index => {
        this.setState({
            index,
        });
    };

    _renderHeader = props => {
        return (
            <TabBar
                {...props}
                scrollEnabled
                indicatorStyle={styles.indicator}
                style={styles.tabbar}
                tabStyle={styles.tab}
                labelStyle={styles.label}
            />
        );
    };

    _renderScene = ({ route }) => {

        this.state.navigation = this.props.navigation;

        switch (route.key) {
            case '1':
                return (
                    <FilteredTenantPage
                        state={this.state}
                    />
                );
            case '2':
                return (
                    <FilteredTenantPage
                        state={this.state}
                    />
                );
            case '3':
                return (
                    <FilteredTenantPage
                        state={this.state}
                    />
                );
            case '4':
                return (
                    <FilteredTenantPage
                        state={this.state}
                    />
                );
            default:
                return null;
        }
    };

    render() {
        return (
            <TabViewAnimated
                style={[styles.container, this.props.style]}
                navigationState={this.state}
                renderScene={this._renderScene}
                renderHeader={this._renderHeader}
                onIndexChange={this._handleIndexChange}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabbar: {
        backgroundColor: '#222',
    },
    tab: {
        width: 120,
    },
    indicator: {
        backgroundColor: '#ffeb3b',
    },
    label: {
        color: '#fff',
        fontWeight: '400',
    },
});