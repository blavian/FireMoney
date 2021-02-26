import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ModalProvider } from "./context/Modal"


import App from "./App";
import configureStore from './store';


// Reducer actions
import * as sessionActions from './store/reducers/session';
import * as budgetActions from './store/reducers/budget';
import * as itemActions from './store/reducers/items';
import * as transactionActions from './store/reducers/transactions';

// Make us a store
const store = configureStore();

// Make Redux available on window only in development
if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.sessionActions = sessionActions;
  window.budgetActions = budgetActions;
  window.itemActions = itemActions;
  window.transactionActions = transactionActions;
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ModalProvider>
        <App />
      </ModalProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
