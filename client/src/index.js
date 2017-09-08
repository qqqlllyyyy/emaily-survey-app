import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";

import App from "./components/App";
import reducers from "./reducers";

// Create a new instance of our redux store
/**
 * @param The different reducers
 * @param Initial state of our application
 * @param applyMiddleware() with necessary middlewares
 */
const store = createStore(reducers, {}, applyMiddleware());

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
