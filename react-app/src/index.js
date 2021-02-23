import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";


import App from "./App";
import configureStore from './store';


// Reducer actions
import * as sessionActions from './store/reducers/session';

// Make us a store
const store = configureStore();

// Make Redux available on window only in development
if (!process.env.NODE_ENV === 'production') {
  window.store = store;
  window.sessionActions = sessionActions;
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
