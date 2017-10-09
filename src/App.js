// Some imports
import React, {Component} from 'react';
import { gql, ApolloClient, createNetworkInterface, ApolloProvider, graphql } from 'react-apollo';

import { StackNavigator, addNavigationHelpers } from "react-navigation";
import {Text, View} from "react-native";
import Routes from "./router";

const AppNavigator = StackNavigator(Routes,
                                    {
                                        headerMode: 'none',
                                    });

import moment from 'moment';

let moveinDate = moment(new Date(), 'YYYY/MM/DD');


class AppWithNavigationState extends Component {

    render() {
        return (
            <AppNavigator/>
        );
    }
}

export default class App extends Component {
    createClient() {
        // Initialize Apollo Client with URL to our server
        return new ApolloClient({
            networkInterface: createNetworkInterface({
                uri: 'https://intense-reaches-57392.herokuapp.com/graphql?',

            }),
            dataIdFromObject: o => o.id
        });


    }

    render() {
        return (
            // Feed the client instance into your React component tree
            <ApolloProvider client={this.createClient()}>
                <AppWithNavigationState />
            </ApolloProvider>
        );
    }
}