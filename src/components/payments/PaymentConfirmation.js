import React, {Component} from 'react';
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import moment from 'moment'

import {

    View,
    StyleSheet,
    Animated,
    Image,
    Easing,
} from 'react-native';

import {

    Text,
    Icon,
    Button
} from 'react-native-elements';

import Animation from 'lottie-react-native';


import Printer from './Printer'

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
        this.outstanding = this.props.navigation.state.params.outstanding;

        this.payment = {
                            invoiceid: this.invoice.id,
                            tenantid: this.tenant.id,
                            date:new Date(), description:'',
                            amount: 0.0, mode:'Cash'
        };

        this.state = {
                        progress: new Animated.Value(0), on: false,
                        initial: true, loading: false, success:false,
                        payment_amount: this.invoice.balance
        };
    }

    componentDidMount() {

        this.props.navigation.setParams({

            period: this.props.navigation.state.params.invoice.periodname
        });

        this._derivePayment();
    }

    _handlePrinter () {

        const _outstanding = this.outstanding - this.payment.amount;

        let data = {

            "name": this.tenant.name,
            "fiscal_period": this.invoice.periodname,
            "amount_paid": "R " + this.payment.amount,
            "payment_date": this.payment.date,
            "outstanding_invoices_amount": "R " + _outstanding,
        };

        let printer = new Printer();

        return printer.print(data);
    };

    _handleSave () {

        this._handlePrinter()
            .then({});

        Animated.timing(this.state.progress, {
            toValue: 1,
            duration: 5000,
        }).start();

        this._derivePayment();

        let p = {payment : this.payment};
        console.log ("Payment log is: ", p);

        this.state.initial = false;
        this.state.loading = true;

        this.forceUpdate();

        this.props.mutate({variables: { payment : this.payment }})
            .then(({ data }) => {

                this._success();
                console.log('got data', this.state.data);

            }).catch((error) => {

            this._failure();
            console.log('there was an error sending the query', error);
        });
    };

    _success() {

        console.log('Successfully persisted payment');

        this.state.progress = new Animated.Value(0);

        this.state.loading = false;
        this.state.success = true;

        this.forceUpdate();

        Animated.timing(this.state.progress, {
            toValue: 0.47,
            duration: 5000,
        }).start(this._navigateToTenantDetail);
    }

    _failure(){

        console.log('Failure to persist payment');

        this.state.progress = new Animated.Value(0.5);
        Animated.timing(this.state.progress, {
            toValue: 1,
            duration: 3000,
        }).start();

        this.state.loading = false;
        this.state.success = false;

        this.forceUpdate();
    }

    _navigateToTenantDetail = (e) => {

       this.props.navigation.navigate('TenantDetails', {tenantId : this.tenant.id});
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

    render(){

        console.log("Render has been called!");

        if(this.state.initial) {

            return (

                <View style={styles.container}>

                    <Text style={{color: 'white', marginTop: 10, fontSize: 24,}}>{this.tenant.name}</Text>
                    <Text style={{color: 'white', marginTop: 10, fontSize: 18,}}>{this.invoice.periodname}</Text>

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