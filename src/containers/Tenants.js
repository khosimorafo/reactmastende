import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet, ScrollView, StatusBar
} from 'react-native';
import ActionButton from "react-native-action-button";
import { SearchBar } from 'react-native-elements'

import {connect} from "react-redux";

import {
        fetchTenantsBySite,
        setTenantSearchText,
        createNewTenant
} from '../actions/tenants';

import VisibleTenants from "./VisibleTenants";

class Tenants extends Component {

    _search = (text) => {

        this.props.dispatch(setTenantSearchText(text));
    };

    componentWillMount() {

        this.props.dispatch(fetchTenantsBySite());
    }

    onCreateTenant = () => {

        this.props.dispatch(createNewTenant());
    };

    render(){

        return (

            <View style={styles.container}>

                <ScrollView
                    keyboardDismissMode="on-drag"
                    contentContainerStyle={{ paddingTop: 80 }}
                    style={{ flex: 1, backgroundColor: '#F8F8F9' }}>

                    <VisibleTenants/>

                </ScrollView>

                <View style={styles.navbar}>
                    <Text style={styles.titleText}>Abaqashi base </Text>
                </View>

                <SearchBar
                    lightTheme
                    on
                    noIcon
                    clearIcon
                    onChangeText={this._search}
                    textInputRef="textInputRef"
                    placeholder="Type Here..."/>

                <ActionButton
                    buttonColor="rgba(231,76,60,1)"
                    onPress={this.onCreateTenant}/>

                <StatusBar barStyle="light-content" />
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    navbar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 65,
        backgroundColor: 'lightseagreen',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: '600',
    },
});

const mapStateToProps = state => {

    return {

        site:       state.sites.site,
    }
};

export default connect(mapStateToProps,)(Tenants);

