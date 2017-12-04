import React from 'react';

import ApolloClient, {
    createNetworkInterface,
} from 'apollo-client';

import Config from 'react-native-config'

let client = new ApolloClient({
    networkInterface: createNetworkInterface(Config.API_URL),
    dataIdFromObject: object => object.id,
});

export default client;
