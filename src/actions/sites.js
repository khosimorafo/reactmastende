// The types of actions that you can dispatch to modify the state of the store
export const types = {

    SET_SELECTED_SITE: 'SET_SELECTED_SITE',
};

export const setSelectedSite = site => {

    return {
        type: types.SET_SELECTED_SITE, payload: site
    }
};