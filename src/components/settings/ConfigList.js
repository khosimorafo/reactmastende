import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {Text, TouchableOpacity, StyleSheet, View} from "react-native";

class ConfigList extends Component{

    renderItem = (item, i) => {
        const {onPressItem} = this.props;

        return (
            <TouchableOpacity key={i}
                              style={styles.item}
                              onPress={() => onPressItem(item)}>
                <Text>{item.name}</Text>
            </TouchableOpacity>
        )
    };

    render() {

        console.log('Configs : ', this.props.configs);
        return (
            <View>
                {this.props.configs.map(this.renderItem)}
            </View>
        )
    }
}

const mapStateToProps = (state) => ({

    configs: state.configs,
});

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'whitesmoke',
        marginBottom: 5,
        padding: 15,
    },
});

export default connect(mapStateToProps) (ConfigList);