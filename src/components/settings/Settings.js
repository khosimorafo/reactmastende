import React, { Component } from 'react'
import {Button, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import Modal from 'react-native-modal';

import { connect } from 'react-redux'
import { configurationActionCreators } from '../../actions/configurations'

import ConfigList from "./ConfigList";
import ViewConfig from "./ViewConfig";
import EditConfig from "./EditConfig";

class Settings extends Component {

    state = {
        isModalVisible: false
    };

    constructor(){

        super();
    }


    onAddConfig = (config) => {

        const {dispatch} = this.props;
        dispatch(configurationActionCreators.add(config));

        this.setState({ visibleModal: null })
    };

    onConfigSelected = (config) => {

        const {dispatch} = this.props;
        dispatch(configurationActionCreators.select(config));

        this.setState({ visibleModal: 0 });
    };

    onRemoveConfig = (name) => {

        const {dispatch} = this.props;
        dispatch(configurationActionCreators.remove(name));

        this.setState({ visibleModal: null });
    };

    _renderButton = (text, onPress) => (

        <TouchableOpacity onPress={onPress}>
            <View style={styles.button}>
                <Text>{text}</Text>
            </View>
        </TouchableOpacity>
    );

    _renderModalContent = () => (
        <View style={styles.modalContent}>
            <ViewConfig config={this.props.config}/>
            {this._renderButton('Delete', () => this.onRemoveConfig(this.props.config.name))}
            {this._renderButton('Close', () => this.setState({ visibleModal: null }))}
        </View>
    );

    _renderAddNewConfig = () => (
        <View style={styles.modalContent}>
            <EditConfig onSubmitSave={this.onAddConfig}/>
        </View>
    );

    render() {

        return (

            <View>

                <ScrollView>

                    {this._renderButton('Add New Config!', () => this.setState({ visibleModal: 1 }))}

                    <ConfigList onPressItem={this.onConfigSelected} />

                    <Modal
                        isVisible={this.state.visibleModal === 0}
                        backdropOpacity={1}
                        animationIn={'zoomInDown'}
                        animationOut={'zoomOutUp'}
                        animationInTiming={1000}
                        animationOutTiming={1000}
                        backdropTransitionInTiming={1000}
                        backdropTransitionOutTiming={1000}
                    >
                        {this._renderModalContent()}
                    </Modal>

                    <Modal
                        isVisible={this.state.visibleModal === 1}
                        backdropOpacity={1}
                        animationIn={'zoomInDown'}
                        animationOut={'zoomOutUp'}
                        animationInTiming={1000}
                        animationOutTiming={1000}
                        backdropTransitionInTiming={1000}
                        backdropTransitionOutTiming={1000}
                    >
                        {this._renderAddNewConfig()}
                    </Modal>

                </ScrollView>

                <View style={styles.navbar}>
                    <Text style={styles.titleText}>Application Settings</Text>
                </View>

                <StatusBar barStyle="light-content" />
            </View>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    navbar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 65,
        backgroundColor: '#050B7A',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 65,
    },
    titleText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: '600',
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
    modalContent: {
        backgroundColor: 'white',
        padding: 5,
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
    },

});

const mapStateToProps = (state) => ({

    configs: state.configs,
    config: state.config.config,
});

export default connect(mapStateToProps)(Settings)