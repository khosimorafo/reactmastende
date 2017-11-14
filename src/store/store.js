import { AsyncStorage } from 'react-native';
import { createStore } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import client from './apolloClient';
import { initialState as configs } from '../reducers/configurations';

import rootReducer from '../reducers/index'
import {autoRehydrate, persistStore} from "redux-persist";

const isProduction = process.env.NODE_ENV !== 'development';
const isClient = typeof document !== 'undefined';

const initialState = {

    configs,
};

/* Commonly used middlewares and enhancers */
/* See: http://redux.js.org/docs/advanced/Middleware.html*/
const middlewares = [thunk, client.middleware()];
const enhancers = [];

if (!isProduction && isClient) {
    const loggerMiddleware = createLogger();
    middlewares.push(loggerMiddleware);

    if (typeof devToolsExtension === 'function') {
        const devToolsExtension = window.devToolsExtension;
        enhancers.push(devToolsExtension());
    }
}

/*const composedEnhancers = compose(
    applyMiddleware(...middlewares),
    ...enhancers
);*/

/* Hopefully by now you understand what a store is and how redux uses them,
 * But if not, take a look at: https://github.com/reactjs/redux/blob/master/docs/api/createStore.md
 * And https://egghead.io/lessons/javascript-redux-implementing-store-from-scratch
 */
const store = createStore(
    rootReducer,
    initialState,
    //composedEnhancers,
    autoRehydrate(),
);


// Add the autoRehydrate middleware to your redux store
const store_ = createStore(rootReducer, autoRehydrate());

//const createStoreWithMiddleware = applyMiddleware(...middlewares)(store);


/* See: https://github.com/reactjs/react-router-redux/issues/305 */
//export const history = syncHistoryWithStore(browserHistory, store);

/* Hot reloading of reducers.  How futuristic!! */
/*if (module.hot) {
    module.hot.accept('./reducers', () => {
        /!*eslint-disable *!/ // Allow require
        const nextRootReducer = require('./reducers').default;
        /!*eslint-enable *!/
        store.replaceReducer(nextRootReducer);
    });
}*/

export { store };

export default configureStore = (onComplete) => {

    persistStore(store, { storage: AsyncStorage }, onComplete);

    return store;
};

