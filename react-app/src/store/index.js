import { createStore, combineReducers } from 'redux';


import enhancer from './enhancer';
import session from './reducers/session';
import budget from './reducers/budget';
import {modal} from './reducers/modal'


// Define reducers in root reducer
const rootReducer = combineReducers({
  session,
  budget,
  modal,
});

// Store config for export
const configureStore = preloadedState => createStore(rootReducer, preloadedState, enhancer);

export default configureStore;
