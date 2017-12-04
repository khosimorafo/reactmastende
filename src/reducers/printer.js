import { types } from '../actions/printer'

const initialState = {
    feed: {},
    isAvailable: false,
    error: '',
};

export const printerReducer = ( state=initialState, action ) => {

    switch (action.type) {

        case types.SET_FEED:
            return { ...state, feed: action.payload };

        case types.SET_AVAILABILITY:
            return { ...state, isAvailable: action.payload };

        case types.SET_PRINTER_ERROR:
            return { ...state, error: action.payload }

        default:
            return state;
    }
};