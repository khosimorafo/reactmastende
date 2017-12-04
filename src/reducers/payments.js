import { types } from '../actions/payments'

const initialState = {
    invoice: {},
    payment: {},
    payments: [],
    sent: false,
    returned: false,
    success: false,
    message: '',
};

export const paymentsReducer = ( state=initialState, action ) => {

    switch (action.type) {

        case types.FETCH_PAYMENTS:
            return { ...state, fetching: true };

        case types.PAYMENT_SENT:
            return {
                ...state,
                sent: true,
                returned: false,
                success: false,
                message: action.payload };

        case types.PAYMENT_REJECTED:
            return {
                ...state,
                sent: true,
                returned: true,
                success: false,
                message: action.payload };

        case types.PAYMENT_FULFILLED:
            return {
                ...state,
                sent: true,
                returned: true,
                success: true,
                message: action.payload
            };

        case types.SET_INVOICE_TO_PAY:
            return { ...state, invoice: action.payload };

        case types.SET_PAYMENT:
            return { ...state, payment: action.payload };


        default:
            return state;
    }
};
