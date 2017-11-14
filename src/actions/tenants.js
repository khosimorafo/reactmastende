// The types of actions that you can dispatch to modify the state of the store
export const types = {

    TENANTS: 'TENANT_LIST',
};

// Helper functions to dispatch actions, optionally with payloads
export const tenantsActionCreators = {

    list: (li) => {

        return {type: types.TENANTS, payload: li}
    }
};