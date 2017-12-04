import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Tenants from '../../containers/VisibleTenants';


export default function CurrentStateIndicator({ state, style }: *) {

    return (
        <View style={[styles.page, style]}>
                <Tenants style={styles.page} navigation={state.navigation} site={state.routes[state.index].site}/>
        </View>
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
    },
    container: {
        backgroundColor: 'rgba(0, 0, 0, .1)',
        borderRadius: 3,
    },
    text: {
        color: '#fff',
        textAlign: 'center',
        marginVertical: 8,
        marginHorizontal: 16,
    },
});