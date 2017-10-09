import React, { Component, PropTypes } from 'react';
import {ScrollView, View, Image, Button, Animated, Text} from 'react-native'
import { List, ListItem } from 'react-native-elements';

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import Animation from 'lottie-react-native';

class Tenants extends Component {


    constructor(props) {

        super(props);
        this.state = {

            progress: new Animated.Value(0),
        };
    }

    componentDidMount() {
        Animated.timing(this.state.progress, {
            toValue: 1,
            duration: 5000,
        }).start();
    }

    _onOpenTenant = (tenant) => {
        this.setState({

            selectedTenantId : tenant.id
        });

        this.props.navigation.navigate('TenantDetails', {tenantId : tenant.id});
    };

    static propTypes = {
        data: PropTypes.shape({
            loading: PropTypes.bool,
            error: PropTypes.object,
        }),
    };

    render () {

        const { navigate } = this.props.navigation;

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
                    source={require('../../animations/wave.json')}
                    progress={this.state.progress}
                />
            )
        } else {
            console.log(this.props.data.tenantList)
        }

        return (

            <ScrollView>
                <Button title="New Tenant" onPress={() => navigate('CreateTenant')} />

                <List>
                    {this.props.data.tenants.map((tenant) => (

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
            </ScrollView>
        )
    }
}

const TenantQuery = gql`query {
  tenants (text: "") {
    id
    name
    zaid
    mobile
    site
    outstanding
    overdue
  }
}`;

const TenantsData = graphql(TenantQuery)(Tenants);

export default TenantsData