import React, {Component} from 'react';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import {
    View,
    StyleSheet,
    TouchableHighlight,
    Animated,
} from 'react-native';

import {
    Text,
    Icon,
    Button
} from 'react-native-elements';

import Animation from 'lottie-react-native';

class InvoiceCreator extends Component {

    static propTypes = {

        mutate: React.PropTypes.func.isRequired,
    };

    constructor(props) {

        super(props);
        this.state = {
            progress: new Animated.Value(0),
        };

        this.state = {

            tenantid : props.navigation.state.params.tenant.id,
            initial: true, loading: false, success:false,
        }
    }

    componentDidMount(){

        console.log('Tenant Id', this.state.tenantid);

        this.props.mutate({variables: { text : this.state.tenantid }})
            .then(({ data }) => {

                this._success();
                console.log('got data', this.state.data);

            }).catch((error) => {

            //this.state.loading = false;
            console.log('there was an error sending the query', error);
        });
    }

    _success(){

        console.log('Succcesfully created next invoice');

        this.state.progress = new Animated.Value(0);

        this.state.loading = false;
        this.state.success = true;

        this.forceUpdate();

        Animated.timing(this.state.progress, {
            toValue: 0.47,
            duration: 5000,
        }).start(this._navigateToTenantDetail);
    }

    _navigateToTenantDetail = () => {

        this.props.navigation.navigate('TenantDetails', {tenantId : this.state.tenantid});
    };

    render() {

        const {navigate} = this.props.navigation;

        if (this.state.initial) {

            return (
                <Animation
                    style={{
                        flex: 1
                    }}
                    source={require('../../animations/circle_grow.json')}
                    progress={this.state.progress}
                />
            )
        }

        if (this.state.loading) {

            return (
                <Animation
                    style={{
                        flex: 1
                    }}
                    source={require('../../animations/circle_grow.json')}
                    progress={this.state.progress}
                />
            )
        }

        if (this.state.success) {

            return (
                <Animation
                    style={{
                        flex: 1
                    }}
                    source={require('../../animations/loader-success-failed.json')}
                    progress={this.state.progress}
                />
            )
        }

        if (!this.state.success)  {

            console.log('state data', this.state.data);
            console.log('props data', this.props.data.error);

            return (

                <View>

                    <Animation
                        style={{
                            flex: 1
                        }}
                        source={require('../../animations/loader-success-failed.json')}
                        progress={this.state.progress}
                    />
                </View>
            )
        } else {

            {

                return (
                    <Animation
                        style={{
                            flex: 1
                        }}
                        source={require('../../animations/loader-success-failed.json')}
                        progress={this.state.progress}
                    />
                )
            }
        }
    }
}

const CreateNextTenantInvoiceMutation = gql`
  mutation createNextTenantInvoice($text: String!) {
    createNextTenantInvoice(text: $text) {
        code
        message
    }
}`;

const TenantInvoiceWithDataAndMutation = graphql(CreateNextTenantInvoiceMutation)(InvoiceCreator);

export default TenantInvoiceWithDataAndMutation