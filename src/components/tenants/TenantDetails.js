import React, {Component} from 'react';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import {
    View,
    ScrollView,
    StyleSheet,
    TouchableHighlight,
    Animated,
} from 'react-native';

import {
    Text,
    Card,
    Icon, List, ListItem,
} from 'react-native-elements';

import Animation from 'lottie-react-native';


class TenantDetails extends Component {


    static propTypes = {
        data: React.PropTypes.shape({
            loading: React.PropTypes.bool,
            error: React.PropTypes.object,
            Tenant: React.PropTypes.object,
        }).isRequired,
    };

    constructor(props) {

        super(props);

        this.state = {

            outstanding: 0.0,
            progress: new Animated.Value(0),
        };
    }

    componentDidMount() {
        Animated.timing(this.state.progress, {
            toValue: 1,
            duration: 5000,
        }).start();
    }

    _onMakeNextPayment = () => {

        const { invoices } = this.props.data.tenant.invoices;

        _invoice = {};

        //this._onResolveNextInvoiceToPay();

        this.props.data.tenant.invoices.map((inv, i) => {

            if(inv.status !== "Paid"){
                _invoice = inv;
            }
        });

        _invoice.tenantname = this.props.data.tenant.name;

        console.log('Customer Payload : ', this.props.data.tenant);
        console.log('Invoice Payload : ', _invoice);
        this.props.navigation.navigate('PaymentConfirmation', { invoice : _invoice, data: this.props.data});
    };

    _onResolveNextInvoiceToPay = () => {

        console.log('Invoices List : ', this.props.data.tenant.invoices);

        this.props.data.tenant.invoices.sort(function (a, b) {

            return a.date - b.date;
        });
    };


    render(){

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
        }

        if (this.props.data.error) {
            console.log(this.props.data.error);
            return (<Text style={{marginTop: 64}}>An unexpected error occurred</Text>)
        } else {

            console.log("Customer is : ", this.props.data.tenant);

            let tenant = this.props.data.tenant;


            this.state.outstanding = 0.0;

            tenant.invoices.map((inv) => {

                this.state.outstanding = this.state.outstanding + inv.balance;
            });

            console.log('Outstanding amount is : ', this.state.outstanding);

            return (

                <ScrollView>

                    <View style={styles.headerContainer}>
                        <Text style={styles.heading}>{tenant.name}</Text>

                        <Text style={styles.label}>{'Oustanding Amount'}</Text>
                        <Text style={styles.amountLabel}>{this.state.outstanding}</Text>

                        <View style={styles.socialRow}>
                            <Icon
                                raised
                                color="#CDDC39"
                                name="bubble-chart"
                                onPress={() => this._onMakeNextPayment()}
                            />
                        </View>
                    </View>

                    <Card containerStyle={{ marginTop: 15 }} title="IZINYANGA EZIKOLOTAYO">
                        <List>
                            {
                                tenant.invoices.map((l, i) => (
                                    <ListItem
                                        key={i}
                                        roundAvatar
                                        avatar={{ uri: l.status }}
                                        title={l.periodname}
                                        titleStyle={{color: 'grey'}}
                                        subtitle={l.duedate}
                                        badge={{ value: l.balance, textStyle: { color: 'white' }, containerStyle: { marginTop: 5 } }}
                                    />
                                ))
                            }
                        </List>
                    </Card>

                </ScrollView>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'lightseagreen',
    },
    heading: {
        color: 'white',
        marginTop: 10,
        fontSize: 22,
    },

    amountLabel: {
        color: 'white',
        marginTop: 10,
        fontSize: 88,
    },

    label: {
        color: 'white',
        marginTop: 10,
        fontSize: 16,
    },
    fonts: {
        marginBottom: 8,
    },
    user: {
        flexDirection: 'row',
        marginBottom: 6,
    },
    image: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    name: {
        fontSize: 16,
        marginTop: 5,
    },
    social: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    subtitleView: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 5,
    },
    ratingImage: {
        height: 19.21,
        width: 100,
    },
    ratingText: {
        paddingLeft: 10,
        color: 'grey',
    },

    socialRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    // Bar
    bar: {
        alignSelf: 'center',
        borderRadius: 1,
        height: 1,
        marginRight: 1
    },
    points: {
        backgroundColor: 'lavender'
    },
});

const SingleTenantLayout = gql`query SingleTenant($text: String!) { 
  tenant (text: $text) {
    id
    name
    zaid
    mobile
    telephone
    site
    room
    gender
    outstanding
    overdue
    invoices { 
                id, total, balance, date, 
                duedate, periodname, status 
                extensions {
                                paybydate, requestby, requestdate, 
                                requestmode, invoiceid
                           }
    		}
    imageurl
    moveindate
    status
  }
}`;

const TenantWithData = graphql(SingleTenantLayout, {
        options: (props) => {

            console.log('Tenant id is : ', props.navigation.state.params.tenantId);
            return {
                variables: {
                    text: props.navigation.state.params.tenantId
                }
            }
        }
    }
)(TenantDetails);

export default TenantWithData