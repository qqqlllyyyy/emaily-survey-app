// Webpack assumes you'll specify a npm_module installed in './client/npm_modules/'
import "materialize-css/dist/css/materialize.min.css";
import "./styles/style.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

import App from "./components/App";
import reducers from "./reducers";

// Test code to make some requests
import axios from "axios";
window.axios = axios;

// Create a new instance of our redux store
/**
 * @param The different reducers
 * @param Initial state of our application
 * @param applyMiddleware() with necessary middlewares
 */
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

/**
 * @param Root component
 * @param Where we're going to render the component to inside our dom
 */
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);

// For test
// console.log("STRIPE KEY IS", process.env.REACT_APP_STRIPE_KEY);
// console.log("Environment is", process.env.NODE_ENV);
