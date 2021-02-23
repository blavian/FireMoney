import { applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";


let enhancer;

// Configure Chrome dev tools as enhancer
if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

export default enhancer;
