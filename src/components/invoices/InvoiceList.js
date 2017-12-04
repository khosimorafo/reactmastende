import React, { Component } from 'react';
import { Text, View, Animated } from 'react-native';

import Animation from 'lottie-react-native';

import PropTypes from 'prop-types'
import Invoice from "./Invoice";

export default class InvoiceList extends Component {

    static propTypes = {

        onInvoiceClick: PropTypes.func.isRequired
    };

    constructor(props) {

        super(props);
        this.state = {
            progress: new Animated.Value(0.5),
        };
    }

    renderInvoice = (invoices, i) => {


        const { onInvoiceClick } = this.props;

        //console.log('Invoice inside renderInvoice : ', invoices);

        return (

            <Invoice key={i} invoice={invoices} onInvoiceClick={onInvoiceClick}/>
        )
    };

    render() {

        /*
        const { invoices, fetching, fetched } = this.props;
        console.log('Props areeee : ', this.props);


        return (

            <View>
                <Text style={{ marginTop: 64 }}>No invoices found</Text>
            </View>
        )*/

        const { invoices, fetching, fetched } = this.props;

        //console.log('Props are : ', this.props);

        if (fetching) {

            return (
                <Animation
                    style={{flex: 1}}
                    source={require('../../animations/circle_grow.json')}
                    progress={this.state.progress}
                />)
        }

        if (fetched && !invoices) {

            return (

                <View>
                    <Text style={{ marginTop: 64 }}>No invoices found</Text>
                </View>)
        }

        return (

            <View>
                {invoices.map(this.renderInvoice)}
            </View>
        );
    };
}
