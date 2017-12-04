import React, {Component} from 'react';
import moment from 'moment'
import PropTypes from 'prop-types'

import ConfirmPayment from './ConfirmPayment'

import { setPayment, sendPayment } from '../../actions/payments'
import { sendFeedToPrinter, setPrinterError } from '../../actions/printer'
import { View, StyleSheet, Animated } from "react-native";

import Animation from 'lottie-react-native';


export default class Payment extends Component {

    static propTypes = {

        onConfirmClick:     PropTypes.func.isRequired,
        onSetPayment:       PropTypes.func.isRequired,
        onSendToPrinter:    PropTypes.func.isRequired,
        onSuccessNavigate:  PropTypes.func.isRequired,
        invoiceid:          PropTypes.string.isRequired,
        tenantid:           PropTypes.string.isRequired,
        sent:               PropTypes.bool.isRequired,
        success:            PropTypes.bool.isRequired,
        returned:           PropTypes.bool.isRequired,
    };

    constructor(props) {

        super(props);

        this.payment = {

            invoiceid:      props.invoiceid,
            tenantid:       props.tenantid,
            date:           new Date(),
            description:    '',
            amount:         props.invoice.balance,
            mode:           'Cash'
        };

        this.state = {

            progress: new Animated.Value(0),
            on: false,
            //initial: true,
            //sent: false,
            //success:false,
            payment_amount: props.invoice.balance
        };
    }

    _derivePayment(){

        let startDate = moment(this.payment.date, 'YYYY/MM/DD');

        const _month = startDate.format('M');
        const _day   = startDate.format('D');
        const _year  = startDate.format('YYYY');

        this.payment.date = startDate.format('YYYY-MM-DD');
        this.payment.description = _month + "-" + _year;
        this.payment.amount = this.state.payment_amount;

        this.props.onSetPayment(this.payment);
    }

    renderPayment = (payment) => {


        const { onConfirmClick, name, period } = this.props;

        return (

            <ConfirmPayment onConfirmClick={onConfirmClick}
                            payment={payment}
                            name={name}
                            period={period}/>
        )
    };

    renderWait = () => {

        this.state.progress = new Animated.Value(0);
        Animated.timing(this.state.progress, {
            toValue: 1,
            duration: 5000,
        }).start();

        return (
            <Animation
                style={{ flex: 1 }}
                source={require('../../animations/circle_grow.json')}
                progress={this.state.progress}
            />
        )
    };

    renderSuccess = () => {

        console.log('Inside success');

        const { onSendToPrinter, onSuccessNavigate } = this.props;

        onSendToPrinter();

        this.state.progress = new Animated.Value(0);
        Animated.timing(this.state.progress, {
            toValue: 0.47,
            duration: 5000,
        }).start(onSuccessNavigate);

        return (
            <Animation
                style={{ flex: 1 }}
                source={require('../../animations/loader-success-failed.json')}
                progress={this.state.progress}
            />
        )
    };

    renderFailure = () => {

        console.log('Inside failure');

        this.state.progress = new Animated.Value(0.5);
        Animated.timing(this.state.progress, {
            toValue: 1,
            duration: 3000,
        }).start();

        return (
            <Animation
                style={{ flex: 1 }}
                source={require('../../animations/loader-success-failed.json')}
                progress={this.state.progress}
            />
        )
    };

    /*
    async _savePayment() {

        const { payment } = this.props;

        await this.props.postPaymentMutation({

            variables: {
                payment,
            }
        }).then((resp) => {

            console.log('Payment Result : ', resp.data);
            if (resp.data.createPayment.success) {

                this.props.dispatch(sendFeedToPrinter());
            } else {
                this.props.dispatch(setPrinterError('Printer error : ', resp.data.createPayment.message))
            }
        });
    }*/

    componentDidMount() {

        this._derivePayment();
    }

    render(){

        const { payment, sent, returned, success, message } = this.props;

        if(!sent&&!returned){

            return (

                <View style={styles.container}>
                    {this.renderPayment(payment)}
                </View>
            )
        } else if(sent&&!returned){

            return (

                <View style={styles.container}>
                    {this.renderWait()}
                </View>
            )

        } else if(sent&&returned&&success){

            return (

                <View style={styles.container}>
                    {this.renderSuccess()}
                </View>
            )

        } else if(sent&&returned&&!success){

            return (

                <View style={styles.container}>
                    {this.renderFailure()}
                </View>
            )

        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});

