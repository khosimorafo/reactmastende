import React, { Component } from 'react';
import { addNavigationHelpers } from "react-navigation";
import { ApolloProvider } from 'react-apollo';

import AppNavigator from "./router";
import configureStore from "./store/store";
import client  from './store/apolloClient';
import { connect } from "react-redux";

//let AppNavigator = StackNavigator(Routes, {headerMode: 'none',});
/*
class AppWithNavigationState extends Component {

    render() {
        return (
            <AppNavigator
                navigation={addNavigationHelpers({
                    dispatch: this.props.dispatch,
                    state: this.props.nav
                })}
            />
        );
    }
}
*/

class Root extends React.Component {
    render() {
        return (
            <AppNavigator navigation={addNavigationHelpers({
                dispatch: this.props.dispatch,
                state: this.props.nav,
            })} />
        );
    }
}

const mapStateToProps = (state) => ({
    nav: state.nav
});

const AppWithNavigationState = connect(mapStateToProps)(Root);

//let store = configureStore((navReducer) => this.setState({ isLoading: false }));

export default class App extends Component {

    constructor(props) {

        super(props);

        this.state = {
            isLoading: true,
            store: configureStore(() => this.setState({ isLoading: false })),
        };
    }

    render() {
        return (
            // Feed the client instance into your React component tree
            <ApolloProvider store={this.state.store} client={client}>
                <AppWithNavigationState />
            </ApolloProvider>
        );
    }
}
