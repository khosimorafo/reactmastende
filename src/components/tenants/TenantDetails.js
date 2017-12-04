import React, {Component} from 'react';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import {sortBy} from "lodash";

const array = require('lodash/array');

import {
    View,
    ScrollView,
    StyleSheet,
    TouchableHighlight,
    Animated, FlatList,
} from 'react-native';

import {
    Text,
    Card,
    List, ListItem,
} from 'react-native-elements';

import Animation from 'lottie-react-native';

import Icon from 'react-native-vector-icons/FontAwesome'


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
            fontLoaded: false,
            invoices: {
                paid: [],
                unpaid: []
            },
        };
    }

    componentDidMount() {

        this.props.navigation.setParams({

            name: this.props.navigation.state.params.name
        });

        Animated.timing(this.state.progress, {

            toValue: 1,
            duration: 5000,
        }).start();
    }

    _onMakeNextPayment = () => {

        const invoices = this.props.data.tenant.invoices;

        _invoice = {};

        invoices.map((inv, i) => {

            if(inv.topaynext){
                _invoice = inv;
            }
        });

        _invoice.tenantname = this.props.data.tenant.name;
        //console.log('Customer Payload : ', this.props.data.tenant);
        //console.log('Invoice Payload : ', _invoice);
        this.props.navigation.navigate('PaymentConfirmation',
            { invoice : _invoice, data: this.props.data, outstanding: this.state.outstanding});
    };

    _createNextTenantInvoice = () => {

        this.props.navigation.navigate('NextInvoice', { tenant:this.props.data.tenant});
    };

    render(){

        const { navigate } = this.props.navigation;

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

            this.state.invoices.unpaid = [];
            this.state.invoices.paid = [];


            tenant.invoices.map((inv) => {

                this.state.outstanding = this.state.outstanding + inv.balance;
                if (inv.status !== 'Paid') {

                    this.state.invoices.unpaid.push(inv);
                } else {

                    this.state.invoices.paid.push(inv);
                }
            });

            console.log('State data : ', this.state.invoices.unpaid);

            return (

                <View>

                    <View style={styles.headerContainer}>
                        <Text style={styles.heading}>{tenant.name}</Text>

                        <Text style={styles.label}>{'Oustanding Amount'}</Text>
                        <Text style={styles.amountLabel}>{this.state.outstanding}</Text>

                        <View style={styles.socialRow}>
                            <Icon
                                raised
                                color="#FFFFFF"
                                type="font-awesome"
                                name="arrow-right"
                                size={25}
                                onPress={() => this._onMakeNextPayment()}
                            />
                        </View>

                    </View>

                    <Card>

                        <View style={[styles.socialRow, { marginVertical: 10 }]}>
                            <Icon
                                onPress={() => navigate('Home')}
                                type="font-awesome"
                                color="#9E9E9E"
                                name="list"
                                size={20}
                            />
                            <Icon
                                onPress={() => console.log('hello')}
                                type="font-awesome"
                                color="#9E9E9E"
                                name="money"
                                size={20}
                            />

                            <Icon
                                onPress={() => console.log('hello')}
                                type="font-awesome"
                                color="#9E9E9E"
                                name="pencil-square-o"
                                size={20}
                            />

                            <Icon
                                onPress={() => this._createNextTenantInvoice()}
                                type="font-awesome"
                                color="#9E9E9E"
                                name="plus-square-o"
                                size={20}
                            />
                        </View>

                    </Card>

                    <Card containerStyle={{ marginTop: 15 }}>

                        <FlatList
                            data={this.state.invoices.unpaid}
                            renderItem={({ item }) => (

                                <ListItem
                                    roundAvatar
                                    avatar={{ uri: item.status }}
                                    title={item.periodname}
                                    titleStyle={{color: 'grey'}}
                                    subtitle={item.duedate}
                                    badge={{ value: item.balance, textStyle: { color: 'white' }, containerStyle: { marginTop: 5 } }}
                                />
                            )}
                            keyExtractor={item => item.id}/>

                    </Card>

                </View>
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
tabbar: {
    backgroundColor: '#222',
},
tab: {
    width: 120,
},
indicator: {
    backgroundColor: '#ffeb3b',
},
label1: {
    color: '#fff',
    fontWeight: '400',
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
                duedate, periodname, status, topaynext 
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
                fetchPolicy: 'cache-and-network',
                variables: {
                    text: props.navigation.state.params.tenantId
                }
            }
        }
    }
)(TenantDetails);


export default TenantWithData