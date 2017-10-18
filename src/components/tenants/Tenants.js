import React, { Component, PropTypes } from 'react';
import {
    ScrollView, View, Image, Button, Animated, Text, StyleSheet, TouchableHighlight,
} from 'react-native'
import { List, ListItem } from 'react-native-elements';

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import Animation from 'lottie-react-native';
import ActionButton from "react-native-action-button";

let GiftedListView = require('react-native-gifted-listview');


class Tenants extends Component {

    constructor(props) {

        super(props);
        this.state = {

            site: props.site,
            progress: new Animated.Value(0.5),
            fabIsVisible: true,
        };
    }

    componentDidMount() {
        Animated.timing(this.state.progress, {
            toValue: 1,
            duration: 3000,
        }).start();
    }


    _onOpenTenant = (tenant) => {
        this.setState({

            selectedTenantId : tenant.id
        });

        this.props.navigation.navigate('TenantDetails', {tenantId : tenant.id});
    };

    _onCreateTenant = () => {

        console.log ('Create Tenant Site', this.state.site);
        this.props.navigation.navigate('CreateTenant', {site: this.state.site});
    };

    static propTypes = {
        data: PropTypes.shape({
            loading: PropTypes.bool,
            error: PropTypes.object,
        }),
    };

    render () {

        this.state.site = this.props.data.variables.text;

        const { navigate } = this.props.navigation.navigate;

        if (this.props.data.error) {
            console.log(this.props.data.error);
            return (
                <View>
                    <Button title="New Tenant" onPress={() => navigate('CreateTenant')} />
                    <Text style={{marginTop: 64}}>An unexpected error occurred</Text>
                </View>)
        }

        if (this.props.data.loading) {

            return (
                <Animation
                    style={{
                        flex: 1
                    }}
                    source={require('../../animations/circle_grow.json')}
                    progress={this.state.progress}
                />
            )
        } else {
            console.log(this.props.data.tenantList)
        }

        console.log("DATA : ", this.props.data);

        return (



            <View style={styles.container}>

                <List>
                    {this.props.data.tenantsBySite.map((tenant) => (

                        <ListItem
                            key={tenant.id}
                            roundAvatar
                            avatar={{ uri: tenant.imageUrl }}
                            title={`${tenant.name.toUpperCase()}`}
                            subtitle={`${tenant.site.toUpperCase()}`}
                            onPress={() => this._onOpenTenant(tenant)}
                        />
                    ))}
                </List>

                <ActionButton
                    buttonColor="rgba(231,76,60,1)"
                    onPress={() => this._onCreateTenant()}
                />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

const TenantQuery = gql`query TenantsBySite($text: String!) { 
  tenantsBySite (text: $text) {
    id
    name
    zaid
    mobile
    site
    outstanding
    overdue
  }
}`;

const TenantsData = graphql(TenantQuery, {
    options: (props) => {

        console.log('Site name is : ', props.site);
        return {
            fetchPolicy: 'cache-and-network',
            variables: {
                text: props.site,
            }
        }
    }
})(Tenants);

export default TenantsData