import React, {Component} from 'react';

import {Card, FormLabel, FormInput} from "react-native-elements";
import {Button, ScrollView} from "react-native";

import store from 'react-native-simple-store';


export default class Settings extends Component{

    constructor(props) {

        super(props);

        this.state = {

            graphql : { location:'', resource:'', uri:''},
            printer : { location:'', uri:''}
        };
    }

    static componentDidMount() {

        console.log('Graphql server settings : ', ql_server);
    }

    _saveConfig () {


        // this.setState({ input: '' });
    }

    _deleteConfig (resource) {


    }

    render(){

        return (

            <ScrolcdlView>

                <Card title="Server Information" containerStyle={{ marginTop: 15 }}>
                    <FormLabel>Resource</FormLabel>
                    <FormInput ref='forminput' onChangeText={(text) => { this.state.graphql.resource = text }}
                               value={this.state.graphql.resource}/>

                    <FormLabel>Location</FormLabel>
                    <FormInput ref='forminput' onChangeText={(text) => { this.state.graphql.location = text }}
                               value={this.state.graphql.location}/>

                    <FormLabel>URI</FormLabel>
                    <FormInput ref='forminput' onChangeText={(text) => { this.state.graphql.uri = text }}
                               value={this.state.graphql.uri}/>

                </Card>

                <Card title="Printer Information" containerStyle={{ marginTop: 15 }}>
                    <FormLabel>Location</FormLabel>
                    <FormInput ref='forminput' onChangeText={(text) => { this.state.printer.location = text }}
                               value={this.state.printer.location}/>

                    <FormLabel>URI</FormLabel>
                    <FormInput ref='forminput' onChangeText={(text) => { this.state.printer.uri = text }}
                               value={this.state.printer.uri}/>
                </Card>

                <Button title={"save"} onPress={ () => {this._saveConfig()} }>Save</Button>

            </ScrolcdlView>

        )
    }
}