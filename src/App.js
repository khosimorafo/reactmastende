// Some imports
import React, {Component} from 'react';
import { ApolloClient, createNetworkInterface, ApolloProvider } from 'react-apollo';

import { StackNavigator } from "react-navigation";
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

        //let objects = realm.objects('Mastende');
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