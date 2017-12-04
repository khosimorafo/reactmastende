import React from 'react'
import PropTypes from 'prop-types'

import { View, StyleSheet } from "react-native";

import {

    Text,
    Icon,
    Button
} from 'react-native-elements';

const ConfirmPayment = ({ onConfirmClick, payment, name, period }) => (
    <View style={styles.container}>

        <Text style={{color: 'white', marginTop: 10, fontSize: 24,}}>{name}</Text>
        <Text style={{color: 'white', marginTop: 10, fontSize: 18,}}>{period}</Text>

        <Text style={{color: 'white', marginTop: 10, fontSize: 18,}}>{payment.mode}</Text>

        <View style={{
            marginTop: 20, height: 220, width: 220, borderRadius: 110,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Text style={styles.amountLabel}>{payment.amount}</Text>

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
                    onPress={ () => onConfirmClick() }>Confirm</Button>

        </View>
    </View>
);

ConfirmPayment.propTypes = {

    onConfirmClick: PropTypes.func.isRequired,
    payment: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    period: PropTypes.string.isRequired,

};

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

export default ConfirmPayment;