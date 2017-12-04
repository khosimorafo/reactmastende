import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { CreatePaymentMutation } from '../actions/graphql/mutations';
import Payment from '../components/payments/Payment';

import { fetchSelectedTenant, displaySelectedTenant } from '../actions/tenants';
import { sendPayment, setPayment } from '../actions/payments';
import { sendFeedToPrinter } from '../actions/printer';

import { NavigationActions } from 'react-navigation';

const Container = graphql(CreatePaymentMutation, { name: 'postPaymentMutation' })( Payment
    /*graphql(createUserMutation, { name: 'createUserMutation' })(Payment)*/
);

const mapStateToProps = state => {

    return {

        payment:        state.payments.payment,
        invoice:        state.invoices.invoice_to_pay,
        invoiceid:      state.invoices.invoice_to_pay.id,
        tenantid:       state.tenants.tenant.id,
        period:         state.invoices.invoice_to_pay.periodname,
        name:           state.tenants.tenant.name,
        sent:           state.payments.sent,
        returned:       state.payments.returned,
        success:        state.payments.success,
        message:        state.payments.message,

    }
};

const mapDispatchToProps = dispatch => {

    return {

        onSetPayment: (payment) => {

            dispatch(setPayment(payment));
        },

        onConfirmClick: () => {

            dispatch(sendPayment());
        },

        onSendToPrinter: () => {

            //dispatch(sendFeedToPrinter());
        },

        onSuccessNavigate: () => {

            //dispatch(fetchSelectedTenant());
            dispatch(NavigationActions.navigate({ routeName: 'TenantDetail' }));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);

