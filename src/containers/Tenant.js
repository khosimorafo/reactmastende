import React, {Component} from 'react';
import { View, StyleSheet, ScrollView } from "react-native";

import TenantDetailHeader from '../components/tenants/TenantDetailHeader';
import VisibleInvoices from "./VisibleInvoices";
import TenantBar from "../components/tenants/TenantBar";


export default class Tenant extends Component {

    render(){

        return (

            <View style={styles.container}>
                <View style={{flex: 4, backgroundColor: 'powderblue'}} >
                    <TenantDetailHeader/>

                </View>
                <View style={{flex: 1, backgroundColor: 'white'}} >
                    <TenantBar/>

                </View>
                <View style={{flex: 5, backgroundColor: 'white'}} >
                    <ScrollView>
                        <VisibleInvoices/>
                    </ScrollView>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});
