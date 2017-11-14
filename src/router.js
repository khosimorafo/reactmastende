import React from 'react';

import CreateTenant from "./components/tenants/CreateTenant";
import TenantDetails from "./components/tenants/TenantDetails";
import PaymentConfirmation from "./components/payments/PaymentConfirmation";
import InvoiceCreator from "./components/invoices/InvoiceCreator";
import TenantsWrapper from "./components/tenants/TenantWrapper2";
import Settings from "./components/settings/Settings";
import {Button} from "react-native";
import Tenants from "./components/tenants/Tenants";
import PopupMenu from "./utils/PopupMenu";


onEdit = () => {

    console.log('Edit clicked');
};

goToSettings = (navigation) => {

    navigation.navigate('Settings');
};

let Routes = {

    Home: { screen: Tenants,

            navigationOptions: ({navigation}) => ({
                title: `Uhla lwabaqashi...`,
                headerStyle:{ backgroundColor: 'transparent'},
                //headerRight: <Button title="Settings" onPress={() => navigation.navigate('Settings')}/>,
                headerRight: <PopupMenu actions={['ABC', 'Mganka', 'Siphakamile', 'Oslo' , 'Settings']} onPress={(eventName, index) => {
                        if (eventName !== 'itemSelected') return;

                        //console.log('Event is', eventName);

                        if (index === 0) {
                            this.onEdit()
                        } else if (index === 4) {
                            this.goToSettings(navigation);
                        }
                    }} />,

            }),
    },

    CreateTenant: { screen: CreateTenant },

    PaymentConfirmation: { screen: PaymentConfirmation,

            navigationOptions: ({navigation}) => ({
                title: `${navigation.state.params.invoice.periodname}`,
                headerStyle:{ backgroundColor: 'transparent'},
            }),
    },

    TenantDetails: { screen: TenantDetails,

            navigationOptions: ({navigation}) => ({
                title: `${navigation.state.params.name}'s Profile`,
                headerStyle:{ backgroundColor: 'transparent'},
            }),
    },

    NextInvoice: {screen: InvoiceCreator},

    Settings: { screen: Settings},
};

export default Routes;