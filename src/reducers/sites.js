import { types } from '../actions/sites'

const initialState = {
    sites: [],
    selected: 'ABC',
};

export const sitesReducer = ( state=initialState, action ) => {

    //console.log('Action is : ', action.payload);

    switch (action.type) {

        case types.SET_SELECTED_SITE:
            return { ...state, selected: action.payload };
        default:
            return state;
    }
};