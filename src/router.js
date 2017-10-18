import React from 'react';

import CreateTenant from "./components/tenants/CreateTenant";
import Tenants from "./components/tenants/Tenants";
import TenantDetails from "./components/tenants/TenantDetails";
//import FirstInvoice from "./components/invoices/FirstInvoice";
import PaymentConfirmation from "./components/payments/PaymentConfirmation";
import InvoiceCreator from "./components/invoices/InvoiceCreator";
import TenantsWrapper from "./components/tenants/TenantsWrapper";
import Settings from "./components/settings/Settings";


const Routes = {

    Home: { screen: TenantsWrapper },
    CreateTenant: { screen: CreateTenant },
    //FirstInvoice: { screen: FirstInvoice },
    PaymentConfirmation: { screen: PaymentConfirmation },
    TenantDetails: { screen: TenantDetails },
    NextInvoice: {screen: InvoiceCreator},
};

export default Routes;