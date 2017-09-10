import React, { Component } from "react";
// BrowserRouter: Brain of react-router, it tells react-router how to behave.
// Route: A react component to setup a rule btw a certain route and some components to be displayed.
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./Header";

// Use some dummy components for now
const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;
const Landing = () => <h2>Landing</h2>;

// We'll leave the outside 'div' for further css purpose.
// Note that 'BrowserRouter' expects to have at most one child. So we need a 'div' in it.
class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            {/* Header will always be displayed */}
            <Header />
            {/* Route for Landing Page */}
            <Route exact path="/" component={Landing} />
            {/* Route for Dashboard */}
            <Route exact path="/surveys" component={Dashboard} />
            {/* Route for New Survey Page */}
            <Route path="/surveys/new" component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

/**
 * @param mapStateToProps
 * @param actions that will be assigned to the component as props
 */
export default connect(null, actions)(App);
