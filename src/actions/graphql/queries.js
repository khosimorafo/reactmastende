import { gql } from 'react-apollo';

export const TenantQuery = gql`query TenantsBySite($text: String!) {
					tenantsBySite(text: $text) {
    id
    name
    zaid
    mobile
    site
    outstanding
    overdue
  }
}`;

export const SelectedTenantQuery = gql`query SingleTenant($text: String!) { 
  tenant (text: $text) {
    id
    name
    zaid
    mobile
    telephone
    site
    room
    gender
    outstanding
    overdue
    invoices { 
                id, total, balance, date, 
                duedate, periodname, status, topaynext 
                extensions {
                                paybydate, requestby, requestdate, 
                                requestmode, invoiceid
                           }
            }
    imageurl
    moveindate
    status
  }
}`;
