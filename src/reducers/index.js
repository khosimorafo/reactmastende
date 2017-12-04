import { combineReducers } from 'redux';
import { configurationsReducer, configurationReducer } from '../reducers/configurations'
import { tenantsReducer } from '../reducers/tenants'
import { sitesReducer } from '../reducers/sites'
import { invoicesReducer } from '../reducers/invoices';
import { paymentsReducer } from '../reducers/payments';
import { printerReducer } from '../reducers/printer';


import nav from './nav'
import client from '../store/apolloClient';

const rootReducer = combineReducers({
    configs:    configurationsReducer,
    config:     configurationReducer,
    tenants:    tenantsReducer,
    invoices:   invoicesReducer,
    payments:   paymentsReducer,
    sites:      sitesReducer,
    printer:    printerReducer,
    apollo:     client.reducer(),
    nav,
});

export default rootReducer;