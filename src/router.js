import React from 'react';

import CreateTenant from "./components/tenants/CreateTenant";
import TenantDetails from "./components/tenants/TenantDetails";
import PaymentConfirmation from "./components/payments/PaymentConfirmation";
import InvoiceCreator from "./components/invoices/InvoiceCreator";
import TenantsWrapper from "./components/tenants/TenantWrapper2";
import Settings from "./components/settings/Settings";
import SiteMap from "./components/site/SiteMap"
import Tenants from "./containers/Tenants";
import Tenant from "./containers/Tenant";
import Payment from "./containers/Payment"
import { StackNavigator } from "react-navigation";

let Routes = {

    Home: { screen: SiteMap },

    Tenants: { screen: Tenants },

    CreateTenant: { screen: CreateTenant },

    PaymentConfirmation: { screen: PaymentConfirmation },

    TenantDetail: { screen: Tenant },

    NextInvoice: {screen: InvoiceCreator},

    Settings: { screen: Settings},

    Payment: { screen: Payment},
};

let AppNavigator = StackNavigator(Routes, {headerMode: 'none',});

export default AppNavigator;
