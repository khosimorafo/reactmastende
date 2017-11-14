import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'

import { Card, Text } from "react-native-elements";

class ViewConfig extends Component {

    constructor(props) {

        super(props);
    }

    render() {


        if (!this.props.config) {

            return <View>Empty</View>
        }

        return (
            <Card title="Config Setting" containerStyle={{ marginTop: 15 }}>

                <Text style={styles.label}>Name</Text>
                <Text style={{height: 40}}>{this.props.config.name}</Text>

                <Text style={styles.label}>Resource</Text>
                <Text style={{height: 40}}>{this.props.config.resource}</Text>

                <Text style={styles.label}>Location</Text>
                <Text style={{height: 40}}>{this.props.config.location}</Text>

                <Text style={styles.label}>URI</Text>
                <Text style={{height: 40}}>{this.props.config.uri}</Text>
            </Card>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'skyblue',
        padding: 15,
    },
    title: {
        textAlign: 'center',
        color: 'white',
    },
    label: {
        fontWeight: 'bold'
    }
});

export default ViewConfig;