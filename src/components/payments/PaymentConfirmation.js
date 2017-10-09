import React, {Component} from 'react';
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';

import moment from 'moment'

import {

    View,
    StyleSheet,
    Animated,
    Image,
    Easing
} from 'react-native';

import {

    Text,
    Icon,
    Button
} from 'react-native-elements';

class PaymentConfirmation extends Component {

    static propTypes = {
        mutate: React.PropTypes.func.isRequired,
    };

    payment = {};
    invoice = {};

    constructor(props) {

        super(props);

        console.log ("Invoice log is: ", this.props.navigation.state.params.invoice);

        this.invoice = this.props.navigation.state.params.invoice;
        this.tenant = this.props.navigation.state.params.data.tenant;
        this.payment = { invoiceid: this.invoice.id, tenantid: this.tenant.id,
            date:new Date(), description:'', amount: 0.0, mode:'Cash' };

        this.state = { loading: false, success:false, payment_amount: this.invoice.balance };

    }

    _handleSave = async () => {

        this._derivePayment();

        let p = {payment : this.payment};
        console.log ("Payment log is: ", p);

        this.state.loading = true;

        this.forceUpdate();

        this.props.mutate({variables: { payment : this.payment }})
            .then(({ data }) => {

                this._success();
                console.log('got data', data);

            }).catch((error) => {

            //this.state.loading = false;
            console.log('there was an error sending the query', error);
        });


    };

    _success(){

        console.log('Succcessfsdsf');

        this.state.loading = false;
        this.state.success = true;

        this.forceUpdate();
    }

    _handleInvoiceUpdate = async () => {

        const { id } = this.invoice;

        let status = 'Draft';

        let balance = this.invoice.balance - this.payment.amount;

        if (balance > 0) { status = 'Partial'; }
        if (balance === this.invoice.amount ) { status = 'Unpaid'; }
        if (balance === 0) { status = 'Paid'; }

        console.log('inv id : ', id);
        console.log('new balance : ', balance);
        console.log('new status : ', status);


        await this.props.updateInvoiceMutation({variables: { id, balance, status }})
            .then(({ data }) => {
                console.log('got data', data);


            }).catch((error) => {
                console.log('there was an error sending the query', error);
            });
    };

    _derivePayment(){


        let startDate = moment(this.payment.date, 'YYYY/MM/DD');

        const _month = startDate.format('M');
        const _day   = startDate.format('D');
        const _year  = startDate.format('YYYY');

        this.payment.invoiceid = this.invoice.id;
        this.payment.tenantid = this.tenant.id;
        this.payment.date = startDate.format('YYYY-MM-DD');
        this.payment.description = _month + "-" + _year;
        this.payment.mode   = "Cash";
        this.payment.amount = this.state.payment_amount;
    }

    componentWillMount(){

        this._derivePayment();
    }

    render(){

        console.log("Render has been called!");

        if (this.state.loading) {

            return (
                <View style={styles.container}>
                    <Bars size={20} color="#FDAAFF" />
                </View>
            )
        }

        if (this.state.success) {
            //console.log(this.props.data.error);
            return (
                <View style={styles.container}>
                    <DoubleBounce size={20} color="#FFFFFF" />
                </View>
            )

        } else {
            return (

                <View style={styles.container}>

                    <Text style={{color: 'white', marginTop: 10, fontSize: 24,}}>{this.tenant.name}</Text>
                    <Text style={{color: 'white', marginTop: 10, fontSize: 18,}}>{this.payment.mode}</Text>

                    <View style={{
                        marginTop: 20, height: 220, width: 220, borderRadius: 110,
                        backgroundColor: 'white',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={styles.amountLabel}>{this.state.payment_amount}</Text>

                        <View style={styles.socialRow}>
                            <Icon
                                raised
                                color="#CDDC39"
                                name="bubble-chart"
                            />
                        </View>
                    </View>

                    <View style={{marginTop: 5, padding: 10}}>

                        <Button textStyle={{color: 'lightseagreen'}} buttonStyle={styles.button}
                                title={"CONFIRM PAYMENT"}
                                onPress={ () => {
                                    this._handleSave()
                                } }>Confirm</Button>

                    </View>

                </View>
            )
        }

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'lightseagreen',
        paddingTop: 20
    },
    heading: {
        color: 'white',
        fontSize: 22,
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
    },
    fonts: {
        marginBottom: 8,
    },
    button: {
        marginTop: 60,
        backgroundColor: 'white',
    },
});

const CreatePaymentMutation = gql`
    mutation createPayment ($payment: PaymentInput!) {
        createPayment(payment: $payment) {
            code
            message
        }
    }`;

const CreatePaymentWithMutation = graphql(CreatePaymentMutation)(PaymentConfirmation);

export default CreatePaymentWithMutation;