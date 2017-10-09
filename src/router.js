import React from 'react';

import CreateTenant from "./components/tenants/CreateTenant";
import Tenants from "./components/tenants/Tenants";
import TenantDetails from "./components/tenants/TenantDetails";
//import FirstInvoice from "./components/invoices/FirstInvoice";
import PaymentConfirmation from "./components/payments/PaymentConfirmation";


const Routes = {

    Home: { screen: Tenants },
    CreateTenant: { screen: CreateTenant },
    //FirstInvoice: { screen: FirstInvoice },
    PaymentConfirmation: { screen: PaymentConfirmation },
    TenantDetails: { screen: TenantDetails },
};

export default Routes;