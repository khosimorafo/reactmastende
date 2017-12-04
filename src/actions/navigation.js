import { NavigationActions } from 'react-navigation';

export function openTenantList() {

    return (dispatch, getState) => {

        console.log('Inside openTenantList');
        dispatch(NavigationActions.navigate({ routeName: 'Tenants' }));
    };
}

export function openCreateNewTenantInvoice() {

    return (dispatch, getState) => {

        dispatch(NavigationActions.navigate({ routeName: 'Tenants' }));
    };
}
