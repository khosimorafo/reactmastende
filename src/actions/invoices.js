import client from '../store/apolloClient';

// The types of actions that you can dispatch to modify the state of the store
export const types = {

    SET_INVOICE_SEARCH_TEXT:        'SET_TENANT_SEARCH_TEXT',
    SET_SELECTED_TENANT_INVOICES:   'SET_SELECTED_TENANT_INVOICES',
    SET_SELECTED_INVOICE:           'SET_SELECTED_INVOICE',
    SET_INVOICE_TO_PAY:             'SET_INVOICE_TO_PAY',
};

export const setInvoiceSearchText = text => {

    return {
        type: types.SET_TENANT_SEARCH_TEXT, payload: text
    }
};

export const setSelectedTenantInvoices = invoices => {

    return {
        type: types.SET_SELECTED_TENANT_INVOICES, payload: invoices
    }
};

export const setSelectedInvoice = invoice => {

    return {
        type: types.SET_SELECTED_INVOICE, payload: invoice
    }
};

export const setNextInvoiceToPay = invoice => {

    return {
        type: types.SET_INVOICE_TO_PAY, payload: invoice
    }
};
