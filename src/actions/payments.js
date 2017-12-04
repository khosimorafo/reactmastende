import client from '../store/apolloClient';
import { CreatePaymentMutation } from '../actions/graphql/mutations'
import { SelectedTenantQuery } from '../actions/graphql/queries'

// The types of actions that you can dispatch to modify the state of the store
export const types = {

    SET_INVOICE_TO_PAY:         'SET_INVOICE_TO_PAY',
    SET_PAYMENT:                'SET_PAYMENT',
    FETCH_PAYMENTS:             'FETCH_PAYMENTS',
    FETCH_PAYMENTS_REJECTED:    'FETCH_PAYMENTS_REJECTED',
    FETCH_PAYMENTS_FULFILLED:   'FETCH_PAYMENTS_FULFILLED',
    PAYMENT_SENT:               'PAYMENT_SENT',
    PAYMENT_REJECTED:           'PAYMENT_REJECTED',
    PAYMENT_FULFILLED:          'PAYMENT_FULFILLED',
};

export const setPayment = payment => {

    return {
        type: types.SET_PAYMENT, payload: payment
    }
};


export function sendPayment() {

    return (dispatch, getState) => {

        const state = getState();

        dispatch({ type: types.PAYMENT_SENT, payload: '' });

        client.mutate({

            mutation: CreatePaymentMutation,
            fetchPolicy: 'network',
            variables: {
                payment: state.payments.payment,
            },
            refetchQueries: [ {
                query: SelectedTenantQuery,
                variables: {
                    text: state.tenants.tenant.id,
                },
            }],

        }).then((resp) => {

            console.log('CREATE PAYMENT RESULT : ', resp.data.createPayment);

            if (resp.data.createPayment.code === 0) {

                dispatch({ type: types.PAYMENT_FULFILLED, payload: resp.data.createPayment.message });

            } else {

                dispatch({ type: types.PAYMENT_REJECTED, payload: resp.data.createPayment.message });
            }
        });
    };
}
