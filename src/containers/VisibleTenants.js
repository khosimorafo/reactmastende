import { connect } from 'react-redux';
import TenantList from "../components/tenants/TenantList";

import {fetchSelectedTenant, setSelectedTenant, displaySelectedTenant} from '../actions/tenants';
import { NavigationActions } from 'react-navigation';

const getVisibleTenants = (tenants, searchText) => {

    if(!searchText){

        return tenants;
    } else {

        return tenants.filter(tenant => tenant.name.toUpperCase().startsWith(searchText.toUpperCase()));
    }
};

const mapStateToProps = state => {

    return {

        fetching:   state.tenants.fetching,
        fetched:    state.tenants.fetched,
        tenants:    getVisibleTenants(state.tenants.tenants, state.tenants.search_text),
        site:       state.tenants.site,
        nav:        state.nav,
    }
};

const mapDispatchToProps = dispatch => {

    return {

        onTenantClick: tenant => {

            dispatch(setSelectedTenant(tenant));
            dispatch(fetchSelectedTenant());
            dispatch(displaySelectedTenant());
            //dispatch(NavigationActions.navigate({ routeName: 'TenantDetail' }));
        }
    }
};

export default connect(

    mapStateToProps,
    mapDispatchToProps
)(TenantList);
