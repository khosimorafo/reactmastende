import { types } from '../actions/invoices'

const initialState = {
    invoice: {},
    invoice_to_pay: {},
    invoices: [],
    fetching: false,
    fetched: false,
    search_text: '',
};

export const invoicesReducer = ( state=initialState, action ) => {

    switch (action.type) {

        case types.SET_INVOICE_SEARCH_TEXT: {

            return {...state, search_text: action.payload};
        }
        case types.SET_SELECTED_TENANT_INVOICES: {

            return { ...state,
                fetching: false,
                fetched: true,
                invoices: action.payload
            };
        }
        case types.SET_SELECTED_INVOICE: {

            return { ...state, invoice: action.payload };
        }
        case types.SET_INVOICE_TO_PAY: {

            return { ...state, invoice_to_pay: action.payload };
        }

        default:
            return state;
    }
};