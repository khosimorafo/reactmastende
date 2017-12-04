import client from '../store/apolloClient';
import {SelectedTenantQuery, TenantQuery} from './graphql/queries';
import { CreateTenantMutation } from '../actions/graphql/mutations'


import { NavigationActions } from 'react-navigation';


// The types of actions that you can dispatch to modify the state of the store
export const types = {

    CREATE_TENANT:          'CREATE_TENANT',
    CREATE_TENANT_SUCCESS:  'CREATE_TENANT_SUCCESS',
    CREATE_TENANT_FAILURE:  'CREATE_TENANT_FAILURE',
    TENANT_SENT:            'TENANT_SENT',

    SET_TENANT_SEARCH_TEXT:     'SET_TENANT_SEARCH_TEXT',
    FETCH_TENANTS:              'FETCH_TENANTS',
    FETCH_TENANTS_REJECTED:     'FETCH_TENANTS_REJECTED',
    FETCH_TENANTS_FULFILLED:    'FETCH_TENANTS_FULFILLED',
    SET_SELECTED_TENANT:        'SET_SELECTED_TENANT',
    SET_SELECTED_TENANT_ID:     'SET_SELECTED_TENANT_ID',
};

export const setTenantSearchText = text => {

    return {
        type: types.SET_TENANT_SEARCH_TEXT, payload: text
    }
};

export const setSelectedTenant = tenant => {

    return {
        type: types.SET_SELECTED_TENANT, payload: tenant
    }
};

export const setSelectedTenantID = id => {

    return {
        type: types.SET_SELECTED_TENANT_ID, payload: id
    }
};

export function fetchTenantsBySite() {

	return (dispatch, getState) => {

        const state = getState();
        //console.log('Inside FETCH tenants : ', state.sites.selected);

        dispatch({ type: 'FETCH_TENANTS' });
		client.query({

			  query: TenantQuery,
			  fetchPolicy: 'network',
			  variables: {
				  text: state.sites.selected,
			  },

		      }).then((resp) => {

					if (resp.data) {

						//console.log('Data return : ', resp.data);
						dispatch({ type: 'FETCH_TENANTS_FULFILLED', payload: resp.data.tenantsBySite });
					}
				});

		};
}

export function fetchSelectedTenant() {

    // Must clear all old tenant data!!!!!!!!!!!!!!!

    return (dispatch, getState) => {

        const state = getState();

        console.log('FETCHING TENANT');

        client.query({

            query: SelectedTenantQuery,
            fetchPolicy: 'network',
            variables: {
                text: state.tenants.tenant.id,
            },

        }).then((resp) => {

            if (resp.data) {

                dispatch({ type: 'SET_SELECTED_TENANT', payload: resp.data.tenant });
                dispatch({ type: 'SET_SELECTED_TENANT_INVOICES', payload: resp.data.tenant.invoices });

                console.log('Returned tenant is : ', resp.data.tenant);

                resp.data.tenant.invoices.map((invoice, i) => {

                    if(invoice.topaynext){
                        dispatch({ type: 'SET_INVOICE_TO_PAY', payload: invoice });
                    }
                });


            }
        });
    };
}

export function sendTenant() {

    return (dispatch, getState) => {

        const state = getState();

        dispatch({ type: types.TENANT_SENT, payload: '' });

        client.mutate({

            mutation: CreateTenantMutation,
            fetchPolicy: 'network',
            variables: {
                tenant: state.tenants.tenant,
            },
            refetchQueries: [ {
                query: SelectedTenantQuery,
                variables: {
                    site: state.sites.site.id,
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

export function displaySelectedTenant() {

    return (dispatch, getState) => {

        dispatch(NavigationActions.navigate({ routeName: 'TenantDetail' }));
    };
}
export function createNewTenant() {

    return (dispatch, getState) => {

        dispatch(NavigationActions.navigate({ routeName: 'CreateTenant' }));
    };
}
