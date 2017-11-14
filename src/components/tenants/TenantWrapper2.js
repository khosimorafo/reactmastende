/*
import React, { PureComponent } from 'react';
import {
    Animated,
    View,
    TouchableWithoutFeedback,
    StyleSheet,
} from 'react-native';
import { TabViewAnimated } from 'react-native-tab-view';
import type { NavigationState } from 'react-native-tab-view/types';
import Icon from 'react-native-vector-icons/FontAwesome'

import FilteredTenantPage from './TenantsPage';

type Route = {
    key: string,
    title: string,
    icon: string,
    site: string,
};

type State = NavigationState<Route>;

export default class TenantWrapper2 extends PureComponent<*, State> {

    static title = 'No animation';
    static backgroundColor = '#f4f4f4';
    static tintColor = '#222';
    static appbarElevation = 4;

    state: State = {
        index: 0,
        routes: [
            { key: '1', title: 'ABC', site:'ABC', icon: 'home' },
            { key: '2', title: 'Mganka', site: 'Mganka', icon: 'home' },
            { key: '3', title: 'Sipha', site:'Siphakamile', icon: 'home' },
            { key: '4', title: 'Oslo', site:'Oslo', icon: 'home' },
            { key: '5', title: 'Setting', site:'none', icon: 'cog' },
        ],
    };

    _handleIndexChange = index => {
        this.setState({
            index,
        });
    };


    _renderLabel = ({ position, navigationState }) => ({ route, index }) => {
        const inputRange = navigationState.routes.map((x, i) => i);
        const outputRange = inputRange.map(
            inputIndex => (inputIndex === index ? '#2196f3' : '#939393')
        );
        const color = position.interpolate({
            inputRange,
            outputRange,
        });
        return (
            <Animated.Text style={[styles.label, { color }]}>
                {route.title}
            </Animated.Text>
        );
    };

    _renderIcon = ({ navigationState, position }) => ({
                                                          route,
                                                          index,
                                                      }: {
        route: Route,
        index: number,
    }) => {
        const inputRange = navigationState.routes.map((x, i) => i);
        const filledOpacity = position.interpolate({
            inputRange,
            outputRange: inputRange.map(i => (i === index ? 1 : 0)),
        });
        const outlineOpacity = position.interpolate({
            inputRange,
            outputRange: inputRange.map(i => (i === index ? 0 : 1)),
        });
        return (
            <View style={styles.iconContainer}>
                <Icon
                    name={route.icon}
                    size={26}
                    style={[styles.icon]}
                />
                <Icon
                    name={route.icon}
                    size={26}
                    style={[styles.icon, styles.outline]}
                />
            </View>
        );
    };

    _renderFooter = props => {
        return (
            <View style={styles.tabbar}>
                {props.navigationState.routes.map((route, index) => {
                    return (
                        <TouchableWithoutFeedback
                            key={route.key}
                            onPress={() => props.jumpToIndex(index)}
                        >
                            <Animated.View style={styles.tab}>
                                {this._renderIcon(props)({ route, index })}
                                {this._renderLabel(props)({ route, index })}
                            </Animated.View>
                        </TouchableWithoutFeedback>
                    );
                })}
            </View>
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
                renderFooter={this._renderFooter}
                onIndexChange={this._handleIndexChange}
                animationEnabled={false}
                swipeEnabled={false}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#f4f4f4',
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: 'rgba(0, 0, 0, .2)',
        paddingTop: 4.5,
    },
    iconContainer: {
        height: 26,
        width: 26,
    },
    icon: {
        position: 'absolute',
        textAlign: 'center',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        color: '#0084ff',
    },
    outline: {
        color: '#939393',
    },
    label: {
        fontSize: 10,
        marginTop: 3,
        marginBottom: 1.5,
        backgroundColor: 'transparent',
    },
    page: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
});*/
