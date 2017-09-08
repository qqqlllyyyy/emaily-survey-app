import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App";

/**
 * @param Root component
 * @param Where we're going to render the component to inside our dom
 */
ReactDOM.render(<App />, document.querySelector("#root"));
