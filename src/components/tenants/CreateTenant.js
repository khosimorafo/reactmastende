import React, { Component, PropTypes } from 'react';

import { Text, View, ScrollView,
    Button, DatePickerAndroid,
    TouchableWithoutFeedback, StyleSheet } from 'react-native';

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';

import moment from 'moment'

import {Card, FormLabel, FormInput} from "react-native-elements";
import {SegmentedControls} from "react-native-radio-buttons";

class CreateTenant extends Component {

    static propTypes = {
        data: PropTypes.shape({
            loading: PropTypes.bool,
            error: PropTypes.object,
        }),
        mutate: PropTypes.func.isRequired,
    };

    tenant = {};

    constructor(props) {

        super(props);

        // Return today's date and time
        const currentTime = new Date();
        // returns the month (from 0 to 11)
        let month = currentTime.getMonth();
        let day = currentTime.getDate();
        let year = currentTime.getFullYear();

        let site = props.navigation.state.params.site;

        // Bad Bad Bad
        if (site === 'Siphakamile'){

            site = 'Sipha'
        }

        //this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.state = { id: '', name:'', zaid:'', mobile:'',phone:'', selectedSiteSegment: site,
            selectedMoveInDate: new Date(year, month, day), simpleText: 'pick a date', email:'', imageurl:'',
            defaultText: 'Khetha usuku lokungena emqashweni.', loading: false, success:false };

        this.tenant = { name:'', zaid:'', gender:'', mobile:'',telephone:'',
            moveindate:'', site:'', room:'', status:'', imageurl:''};
    }

    _handleSave = async () => {

        this._deriveTenant();

        let t = {tenant : this.tenant};
        console.log ("Tenant log is: ", t);

        this.state.loading = true;

        this.forceUpdate();

        this.props.mutate({variables: {tenant : this.tenant}})
            .then(({ data }) => {

                console.log('got data', data);
                this.state.id = data.createTenant.id;
                this._success();

            }).catch((error) => {
            console.log('there was an error sending the query', error);
        });

    };

    _success(){

        console.log('Succcesfully created id : ', this.state.id);

        this.state.loading = false;
        this.state.success = true;

        this.forceUpdate();


        this.props.navigation.navigate('TenantDetails', {tenantId : this.state.id});

    }

    _deriveTenant(){

        let moveinDate = moment(this.state.selectedMoveInDate, 'YYYY/MM/DD');

        this.tenant.name = this.state.name;
        this.tenant.zaid = this.state.zaid;
        this.tenant.gender = this.state.selectedGenderSegment;
        this.tenant.mobile = this.state.mobile;
        this.tenant.telephone = this.state.phone;
        this.tenant.site = this.state.selectedSiteSegment;
        this.tenant.room = '';
        this.tenant.moveindate = moveinDate.format('YYYY-MM-DD');
        this.tenant.imageurl = this.state.imageurl;
    }

    _showPicker = async (stateKey, options) => {
        try {
            var newState = {};
            const {action, year, month, day} = await DatePickerAndroid.open(options);
            if (action === DatePickerAndroid.dismissedAction) {
                newState[stateKey + 'Text'] = 'dismissed';
            } else {
                var date = new Date(year, month, day);
                newState[stateKey + 'Text'] = moment(date).format("dddd, MMMM Do YYYY");
                newState[stateKey + 'Date'] = date;
                this.state.selectedMoveInDate = date;
            }
            this.setState(newState);
        } catch ({code, message}) {
            console.warn(`Error in example '${stateKey}': `, message);
        }
    };

    render() {

        const genderOptions = ['MALE', 'FEMALE'];
        const siteOptions = ['ABC', 'MGANKA', 'SIPHA', 'OSLO'];

        const { selectedMoveInDate } = this.state;
        const startDate = selectedMoveInDate ? selectedMoveInDate.toString() : '';


        function setSelectedGenderOption(selectedGenderSegment){
            this.setState({
                selectedGenderSegment
            });

        }
        function setSelectedSiteOption(selectedSiteSegment){
            this.setState({
                selectedSiteSegment
            });
        }


        console.log("Render has been called!");

        if (this.state.loading) {

            return (
                <View style={styles.container}>
                    <Bars size={20} color="#FDAAFF" />
                </View>
            )
        }

        if (this.state.success) {
            //console.log(this.props.data.error);
            return (
                <View style={styles.container}>
                    <DoubleBounce size={20} color="#FFFFFF" />
                </View>
            )

        } else {
            return (

                <ScrollView>

                    <Card title="Personal Information" containerStyle={{ marginTop: 15 }}>
                        <FormLabel>Name</FormLabel>
                        <FormInput ref='forminput' onChangeText={(text) => { this.state.name = text }} />

                        <FormLabel>ID Number</FormLabel>
                        <FormInput ref='forminput' onChangeText={(text) => { this.state.zaid = text }} />

                        <FormLabel>Mobile</FormLabel>
                        <FormInput ref='forminput' onChangeText={(text) => { this.state.mobile = text }}/>

                        <FormLabel>Telephone</FormLabel>
                        <FormInput ref='forminput' onChangeText={(text) => { this.state.phone = text }} />

                        <View style={{marginTop: 5, padding: 10, backgroundColor: 'white'}}>
                            <Text style={{paddingBottom: 5, fontWeight:'bold'}}>Gender</Text>
                            <SegmentedControls
                                options={ genderOptions }
                                onSelection={ setSelectedGenderOption.bind(this) }
                                selectedOption={ this.state.selectedGenderSegment }/>
                        </View>

                    </Card>

                    <Card title="Site Information" containerStyle={{ marginTop: 15 }}>

                        <View style={{marginTop: 5, padding: 10, backgroundColor: 'white'}}>
                            <Text style={{paddingBottom: 5, fontWeight:'bold'}}>Site</Text>
                            <SegmentedControls
                                options={ siteOptions }
                                onSelection={ setSelectedSiteOption.bind(this) }
                                selectedOption={ this.state.selectedSiteSegment.toUpperCase() }/>
                        </View>

                        <View style={{marginTop: 5, padding: 10, backgroundColor: 'white'}}>
                            <Text style={{paddingBottom: 5, fontWeight:'bold'}}>Move In Date</Text>
                            <TouchableWithoutFeedback
                                onPress={this._showPicker.bind(this, 'default', {date: this.state.selectedMoveInDate, mode: 'default'})}>
                                <View>
                                    <Text style={{color: 'black'}}>{this.state.defaultText}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </Card>



                    <Button title={"create"} onPress={ () => {this._handleSave()} }>Create</Button>

                </ScrollView>

            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    segmentedControl: {
        backgroundColor: 'lightseagreen',
    }
});


const CreateTenantMutation = gql`
  mutation CreateTenant($tenant: TenantInput!) {
    createTenant(tenant: $tenant) {
        id
        message
        code
    }
  }`;

const AddTenantWithMutation = graphql(CreateTenantMutation)(CreateTenant);

export default AddTenantWithMutation;