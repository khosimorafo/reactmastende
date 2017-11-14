// The types of actions that you can dispatch to modify the state of the store
export const types = {

    ADD_CONFIGURATION: 'ADD',
    EDIT_CONFIGURATION: 'EDIT',
    REMOVE_CONFIGURATION: 'REMOVE',
    CONFIG_SELECTED: 'SELECTED',
    PRINTER_LOCATION: 'PRINTER'
};

// Helper functions to dispatch actions, optionally with payloads
export const configurationActionCreators = {

    add: (item) => {
        return {type: types.ADD_CONFIGURATION, payload: item}
    },
    remove: (key) => {

        return {type: types.REMOVE_CONFIGURATION, payload: key}
    },
    select: (item) => {

        return {type: types.CONFIG_SELECTED, payload: item}
    },
    printer: (item) => {

        return {type: types.PRINTER_LOCATION, payload: item}
    }
};

