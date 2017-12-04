import { types } from '../actions/tenants'

const initialState = {
	tenant: {},
  	tenants: [],
  	fetching: false,
  	fetched: false,
    site: 'ABC',
	search_text: '',
	//new and edit state types
    sent: false,
    returned: false,
    success: false,
    message: '',
};

export const tenantsReducer = ( state=initialState, action ) => {
  
  	switch (action.type) {

        case types.SET_TENANT_SEARCH_TEXT:
            return { ...state, search_text: action.payload };
  		case types.FETCH_TENANTS:
  			return { ...state, fetching: true };
  		case types.FETCH_TENANTS_REJECTED:
  			return { ...state, fetching: false, error: action.payload };
  		case types.FETCH_TENANTS_FULFILLED:
  			return {
  				...state,
  				fetching: false,
  				fetched: true,
  				tenants: action.payload
  			};
        case types.SET_SELECTED_TENANT: {

            return { ...state, tenant: action.payload };
        }

        case types.TENANT_SENT:
            return {
                ...state,
                sent: true,
                returned: false,
                success: false,
                message: action.payload };

        case types.CREATE_TENANT_FAILURE:
            return {
                ...state,
                sent: true,
                returned: true,
                success: false,
                message: action.payload };

        case types.CREATE_TENANT_SUCCESS:
            return {
                ...state,
                sent: true,
                returned: true,
                success: true,
                message: action.payload
            };

  		default:
  			return state;
  	}
};