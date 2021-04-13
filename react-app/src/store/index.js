import { createStore, combineReducers } from 'redux';


import enhancer from './enhancer';
import session from './reducers/session';
import budget from './reducers/budget';
import {modal, transactionModal} from './reducers/modal';
import userTransactions from './reducers/transaction';


// Define reducers in root reducer
const rootReducer = combineReducers({
  session,
  budget,
  modal,
  transactionModal,
  userTransactions
});

// Store config for export
const configureStore = preloadedState => createStore(rootReducer, preloadedState, enhancer);

export default configureStore;
