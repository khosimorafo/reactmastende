import React, { Component } from 'react'
import {View, Text, StyleSheet, Button, TextInput, Switch, TouchableOpacity} from 'react-native'

import {Card, FormLabel, FormInput} from "react-native-elements";
import { connect} from "react-redux";

class EditConfig extends Component {

    config = {name:'', resource:'', location:'', uri:''};

    constructor(props) {

        super(props);
    }

    onSubmitSave = () => {

        //console.log('Entered Name : ', this.config.name);

        const {onSubmitSave} = this.props;

        if (this.config.name === '') return; // Don't submit if empty

        console.log('Entered Config : ', this.config);

        onSubmitSave(this.config);
    };

    _renderButton = (text, onPress) => (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.button}>
                <Text>{text}</Text>
            </View>
        </TouchableOpacity>
    );


    render() {

        return (
            <View>

                <Card title="Add New Setting" containerStyle={{ marginTop: 15 }}>

                    <FormLabel>Name</FormLabel>
                    <FormInput
                        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                        onChangeText={(text) => this.config.name=text}
                    />

                    <FormLabel>Resource</FormLabel>
                    <FormInput
                        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                        onChangeText={(text) => this.config.resource=text}
                    />

                    <FormLabel>Location</FormLabel>
                    <FormInput
                        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                        onChangeText={(text) => this.config.location=text}
                    />

                    <FormLabel>URI</FormLabel>
                    <FormInput
                        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                        onChangeText={(text) => this.config.uri=text}
                    />
                </Card>

                {this._renderButton('Submit', () => this.onSubmitSave())}

            </View>
        )
    }
}

const mapStateToProps = (state) => ({

    config: state.config.config,
});

export default connect(mapStateToProps)(EditConfig)

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'skyblue',
        padding: 15,
    },
    title: {
        textAlign: 'center',
        color: 'white',
    },
    button: {
        backgroundColor: 'lightblue',
        padding: 12,
        margin: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
});