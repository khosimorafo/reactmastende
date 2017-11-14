import { types } from '../actions/tenants'


const persistedState = [];

export const tenantsReducer = (state = persistedState, action) => {

    const {type, payload} = action;

    switch (type) {

        case types.TENANTS: {

            return payload;
        }
    }
    return state;
};
