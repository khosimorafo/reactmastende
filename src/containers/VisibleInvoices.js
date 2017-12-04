import { connect } from 'react-redux';
import InvoiceList from "../components/invoices/InvoiceList";

import { setSelectedInvoice } from '../actions/invoices';
import { NavigationActions } from 'react-navigation';

const getVisibleInvoices = (invoices, searchText) => {

    if(!searchText){

        return invoices;
    } else {

        return invoices.filter(invoice => invoice.name.toUpperCase().startsWith(searchText.toUpperCase()));
    }
};

const mapStateToProps = state => {

    return {

        fetching:   state.invoices.fetching,
        fetched:    state.invoices.fetched,
        invoices:   state.invoices.invoices,//getVisibleInvoices(state.invoices.invoices, state.invoices.search_text),
        nav:        state.nav,
    }
};

const mapDispatchToProps = dispatch => {

    return {

        onInvoiceClick: invoice => {

            dispatch(setSelectedInvoice(invoice));
        }
    }
};

export default connect(

    mapStateToProps,
    mapDispatchToProps
)(InvoiceList);