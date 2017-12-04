import { gql } from 'react-apollo';

export const CreateTenantMutation = gql`
  mutation CreateTenant($tenant: TenantInput!) {
    createTenant(tenant: $tenant) {
        id
        message
        code
    }
  }`;


export const CreatePaymentMutation = gql`
    mutation createPayment ($payment: PaymentInput!) {
        createPayment(payment: $payment) {
            code
            message
        }
}`;
