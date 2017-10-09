import React, {Component} from 'react';

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

let moment = require('moment');

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

class FirstInvoice extends Component {

    propTypes = {
        data: React.PropTypes.shape({
            loading: React.PropTypes.bool,
            error: React.PropTypes.object,
            Invoice: React.PropTypes.object,
        }).isRequired,

        mutate: React.PropTypes.func.isRequired,
    };


    customer = {};
    invoice = {};
    line_item = {};
    payment = {};

    constructor(props) {

        super(props);

        this.state = { rental_amount: parseFloat(330.0), payment_amount: parseFloat(0.0) };

        const a = parseFloat(0.0);

        this.customer = this.props.navigation.state.params.tenant;
        this.invoice = { customerId: '', date:'', duedate:'', reference:'', number:'', balance: a, amount: parseFloat(0.0) };
        this.line_item = { itemname:'', itemdescription:'', quantity: 1, itemamount: parseFloat(0.0), cost: parseFloat(0.0) };
        this.payment = { date:'', reference:'', amount: parseFloat(0.0) };

        //this.invoice.balance = a;
        //this.state.rental_amount = 330;
        this.invoice.customerId = this.customer.id;
        console.log('CUSTOMER : ', this.invoice.customerId);
    }

    _handleSave = async () => {

        const {customerId, date, duedate, reference, number, balance,  amount} = this.invoice;
        const {itemname, itemdescription, quantity, itemamount, cost} = this.line_item;

        console.log('Customer IDDDD ', customerId);

        await this.props.mutate({
            variables: {
                customerId, date, duedate, reference, number, balance,  amount,
                itemname, itemdescription, quantity, itemamount, cost
            }
        })
            .then(({ data }) => {

                console.log('got data', data.createInvoice);
                this.props.navigation.navigate('PaymentConfirmation', {invoice : data.createInvoice});

            }).catch((error) => {

                console.log('there was an error sending the invoice query', error);
            });
    };

    _deriveInvoice(){

        console.log('First Invoice ', this.customer);

        //const tenant = this.props.navigation.state.params.tenant;

        //let startDate = moment(tenant.moveindate);

        let startDate = moment(this.customer.moveindate, 'YYYY/MM/DD');

        const _month = startDate.format('M');
        const _day   = startDate.format('D');
        const _year  = startDate.format('YYYY');

        // Clone the value before .endOf()
        let endDate = moment(startDate).clone().endOf('month');

        let _numberOfDays = endDate.diff(startDate, 'days');

        let line_amount = this.state.rental_amount * (_numberOfDays/30);

        console.log('Number of Days ', _numberOfDays);
        console.log('Rental Amount ', this.state.rental_amount);
        console.log('Line Amount ', line_amount);

        let quantity = 1;

        this.line_item.name = "Rental for " + this.customer.name;
        this.line_item.quantity = quantity;
        this.line_item.item_amount = line_amount;
        this.line_item.cost = quantity * line_amount;

        this.invoice.date = new Date();
        this.invoice.due_date = new Date();
        this.invoice.amount = this.line_item.cost;
        this.invoice.balance = this.invoice.amount;

        this.state.payment_amount = this.invoice.balance;

        this.payment.date = new Date();
        this.payment.reference = _month + "-" + _year;
        this.payment.amount = this.state.payment_amount;

        console.log(this.invoice);
        console.log(this.payment);
    }

    componentWillMount(){

        this._deriveInvoice();
    }

    render(){

        return (

            <View style={styles.container}>


                <View style={{height: 150, width: 200, marginTop:5, marginBottom: 10,
                    padding: 10}}>

                    <Text style={styles.label}>{this.customer.name}</Text>

                    <Text style={styles.label}>{this.customer.moveindate}</Text>

                    <Text style={styles.label}>{this.customer.site}</Text>

                </View>

                <View style={{ height: 220, width: 220, borderRadius: 110,
                    backgroundColor:'white',
                    justifyContent: 'center',
                    alignItems: 'center'}}>
                    <Text style={styles.amountLabel}>{this.invoice.balance}</Text>
                </View>

                {this.props.loading ? <Spinner /> :
                    <Button textStyle={{color:'lightseagreen'}} buttonStyle={styles.button} title={"CREATE INVOICE"}
                            onPress={ () => {this._handleSave()} }>Continue</Button>}
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightseagreen'
    },
    heading: {
        color: 'white',
        marginTop: 10,
        fontSize: 22,
        paddingBottom:72
    },

    amountLabel: {
        color: 'lightseagreen',
        marginTop: 10,
        fontSize: 88,
    },

    label: {
        color: 'white',
        marginTop: 10,
        fontSize: 16,
        fontWeight:'bold'
    },
    fonts: {
        marginBottom: 8,
    },
    button: {
        marginTop: 60,
        backgroundColor: 'white',
        fontWeight:'bold'
    },
});

const CreateInvoiceWithPaymentMutation = gql`
  mutation TenantInvoice(   $customerId: ID, $date: String!, 
                            $duedate: String! $number: String!, $reference: String!,
                            $balance: Float!, $amount: Float!,
                            $itemname: String!, $itemdescription: String!,
                            $cost: Float!, $quantity: Float!
                        ) {
      createInvoice(
            customerId: $customerId, 
            invoiceDate: $date, 
            dueDate: $duedate, 
            invoiceNumber: $number, 
            referenceNumber: $reference,
            balance: $balance,
            amount: $amount,
            status: Sent,
            lineItems: 	[{ 
                            name: $itemname, 
                            description: $itemdescription, 
                            quantity: $quantity,
                            lineCost: $cost
                        }]
      ) 
      {
        id
        customer { id, name }
        balance
        amount
      }
  }`;

const FirstInvoiceCreation = graphql(CreateInvoiceWithPaymentMutation)(FirstInvoice);

export default FirstInvoiceCreation