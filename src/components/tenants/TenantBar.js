import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity
} from 'react-native';

import {connect} from "react-redux";

import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome'

import { openCreateNewTenantInvoice, openTenantList } from '../../actions/navigation'

class TenantBar extends Component {


    render() {

        return (
            <View style={[styles.socialRow, {marginVertical: 20}]}>

                <TouchableOpacity onPress={() => this.props.onOpenTenantListClick()}>
                    <Icon
                        type="font-awesome"
                        color="#9E9E9E"
                        name="list"
                        size={25}
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.onOpenToggleClick()}>
                    <Icon
                        type="font-awesome"
                        color="#9E9E9E"
                        name="money"
                        size={25}
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.onOpenNewInvoiceClick()}>
                    <Icon
                        type="font-awesome"
                        color="#9E9E9E"
                        name="plus-square-o"
                        size={25}
                    />
                </TouchableOpacity>

            </View>
        )
    }
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    socialRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
});

const mapStateToProps = state => {

    return {}
};

const mapDispatchToProps = dispatch => {

    return {
/*
        onMakeNextPayment: () => {

            dispatch(NavigationActions.navigate({ routeName: 'Payment' }));
        },
*/
        onOpenTenantListClick:  () => {
            //dispatch(NavigationActions.navigate({ routeName: 'Tenants' }));
            dispatch(openTenantList())
        },
        onOpenNewInvoiceClick:  () => {
            //dispatch(NavigationActions.navigate({ routeName: 'Tenants' }));
            dispatch(openTenantList())
        },
        onOpenToggleClick:      () => {
            dispatch(NavigationActions.navigate({ routeName: 'Tenants' }));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TenantBar);
