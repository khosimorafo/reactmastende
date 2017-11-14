import React, {Component} from 'react';
import { StackNavigator } from "react-navigation";
import { ApolloProvider } from 'react-apollo';

import Routes from "./router";
import configureStore from "./store/store";
import client  from './store/apolloClient';

let AppNavigator = StackNavigator(Routes);

class AppWithNavigationState extends Component {

    render() {
        return (
            <AppNavigator/>
        );
    }
}

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
                <AppNavigator />
            </ApolloProvider>
        );
    }
}
