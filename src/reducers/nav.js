import { NavigationActions } from 'react-navigation'
import AppNavigator from '../router'

const initialState = AppNavigator.router.getStateForAction(NavigationActions.init());

export default nav = (state = initialState, action) => {

    switch (action.type) {

        default:
            const newState = AppNavigator.router.getStateForAction(action, state);
            return newState || state;
    }
}