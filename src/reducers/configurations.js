import { types } from '../actions/configurations'

const persistedState = [

    {name: 'graphql', location:'intense-reaches-57392', resource:'', uri:'herokuapp.com/graphql?' },
    //{name: 'printer', location:'', resource:'', uri:'http://192.168.43.144:8080/receipt' },
];

export const configurationsReducer = (state = persistedState, action) => {

    const {type, payload} = action;

    switch (type) {

        case types.ADD_CONFIGURATION: {

            return state.concat(payload);
        }
        case types.REMOVE_CONFIGURATION: {

            return state.filter((config, i) => config.name !== payload);
        }
    }
    return state;
};

export const configurationReducer = (state = {}, action) => {

    const {type, payload} = action;

    switch (type) {
        case types.CONFIG_SELECTED: {

            return {
                config: payload,
            }
        }

        case types.PRINTER_LOCATION: {

            return {
                printer: payload,
            }
        }
    }
    return state;
};