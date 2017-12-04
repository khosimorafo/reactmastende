import React, {Component} from 'react';
import {
    Text,
    StyleSheet,
    View
} from 'react-native';


import { connect } from "react-redux";
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome'

class TenantDetailHeader extends Component {

    render() {

        const { name, outstanding } = this.props;

        return(
            <View style={styles.headerContainer}>
                <Text style={styles.heading}>{name}</Text>

                <Text style={styles.label}>{'Oustanding Amount'}</Text>
                <Text style={styles.amountLabel}>{outstanding}</Text>

                <View style={styles.socialRow}>
                    <Icon
                        raised
                        color="#FFFFFF"
                        type="font-awesome"
                        name="arrow-right"
                        size={25}
                        onPress={() => this.props.onMakeNextPayment()}
                    />
                </View>

            </View>
        )
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

    socialRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
});

const mapStateToProps = state => {

    return {

        name        :  state.tenants.tenant.name,
        outstanding :  state.tenants.tenant.outstanding,
    }
};

const mapDispatchToProps = dispatch => {

    return {

        onMakeNextPayment: () => {

            dispatch(NavigationActions.navigate({ routeName: 'Payment' }));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TenantDetailHeader);