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
        };
    }

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

                <View contentContainerStyle={{ paddingTop: 200 }}>

                    <List>
                        {this.state.list.map((tenant) => (

                            <Tenant onClick={this._onOpenTenant} tenant={tenant} />
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
