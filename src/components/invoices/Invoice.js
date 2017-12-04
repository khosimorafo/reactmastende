import React from 'react'
import PropTypes from 'prop-types'

import { ListItem } from 'react-native-elements';
import {View} from "react-native";

const Invoice = ({ onInvoiceClick, invoice }) => (
    <View>
        <ListItem
            roundAvatar
            avatar={{ uri: invoice.status }}
            title={invoice.periodname}
            titleStyle={{color: 'grey'}}
            subtitle={invoice.duedate}
            badge={{ value: invoice.balance, textStyle: { color: 'white' }, containerStyle: { marginTop: 5 } }}
        />
    </View>
);

Invoice.propTypes = {

    onInvoiceClick: PropTypes.func.isRequired,
    tenant: PropTypes.object,
};

export default Invoice;
