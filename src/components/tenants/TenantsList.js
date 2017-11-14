import React, { Component } from 'react'
import {Text, TouchableOpacity, StyleSheet, View, SectionList, FlatList} from "react-native";

import _ from 'lodash'

import { List, ListItem, SearchBar } from 'react-native-elements';


const extractKey = ({id}) => id;


export default class TenantsList extends Component{


    constructor(props) {

        super(props);
        this.state = {


            list: props.tenants,
            data: props.tenants,
        };
    }

    _search = (text) => {

        this.state.list = this.state.data;

        copy = [];

        this.state.list.forEach((tenant) => {

            if (tenant.name.toUpperCase().startsWith(text.toUpperCase())){

                copy.push(tenant);
            }
        });

        this.setState({ list: copy});
    };

    _onOpenTenant = (tenant) => {

        this.props.navigation.navigate('TenantDetails', {tenantId : tenant.id, name: tenant.name});
    };

    renderItem = (item) => {

        return <Text  style={styles.row}>{item.item.name}</Text>
    };

    renderHeader = (headerItem) => {

        return <Text>{headerItem.section.key}</Text>
    };

    render(){

        if (this.props.type === 'flat'){

            return (

                <View style={styles.container}>

                    <View style={{ marginTop: 10, marginBottom: 0 }}>
                        <SearchBar
                            lightTheme
                            on
                            noIcon
                            clearIcon
                            onChangeText={this._search}
                            textInputRef="textInputRef"
                            placeholder="Type Here..."
                        />
                    </View>

                    <List>
                        {this.state.list.map((tenant) => (

                            <ListItem
                                key={tenant.id}
                                roundAvatar
                                avatar={{ uri: tenant.imageUrl }}
                                title={`${tenant.name.toUpperCase()}`}
                                subtitle={`${tenant.site.toUpperCase()}`}
                                onPress={() => this._onOpenTenant(tenant)}
                            />
                        ))}
                    </List>

                </View>
            );
        } else {


            dataSource = _.groupBy(this.props.tenants, d => d.site);

            dataSource = _.reduce(dataSource, (acc, next, index) => {

                acc.push({
                    key: index,
                    data: next,
                });
                return acc;
            }, []);

            return ( <View>

                    <SectionList
                        renderItem={this.renderItem}
                        renderSectionHeader={this.renderHeader}
                        sections={dataSource}
                        keyExtractor={extractKey}/>

                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex: 1,
    },
    row: {
        padding: 15,
        marginBottom: 5,
        backgroundColor: 'skyblue',
    },
    rowDark: {
        padding: 15,
        marginBottom: 5,
        backgroundColor: 'steelblue',
    },
    header: {
        padding: 15,
        marginBottom: 5,
        backgroundColor: 'darkblue',
        color: 'white',
        fontWeight: 'bold',
    },
});

const mapStateToProps = (state) => ({

    list: state.tenants,
});