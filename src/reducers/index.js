import { combineReducers } from 'redux';
import { configurationsReducer, configurationReducer } from '../reducers/configurations'
import client from '../store/apolloClient';

const rootReducer = combineReducers({
    configs: configurationsReducer,
    config:  configurationReducer,
    apollo:  client.reducer(),
});

export default rootReducer;
