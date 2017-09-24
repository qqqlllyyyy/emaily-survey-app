import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Payments from "./Payments";

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return [
          <li key="1">
            <a
              href="https://github.com/qqqlllyyyy/emaily-survey-app"
              target="_blank"
            >
              <i className="fa fa-code fa-lg" /> View Code
            </a>
          </li>,
          <li key="2">
            <a href="/auth/google">
              <i className="fa fa-sign-in fa-lg" /> Login with Google
            </a>
          </li>
        ];
      default:
        return [
          // <li key="1">
          //   <Payments />
          // </li>,
          <li key="3" style={{ margin: "0 10px" }}>
            Credits: {this.props.auth.credits}
          </li>,
          <li key="2">
            <a href="/api/logout">Logout</a>
          </li>
        ];
    }
  }

  render() {
    return (
      <header>
        <div className="container">
          <div id="branding">
            <h1>
              <Link to={this.props.auth ? "/surveys" : "/"}>
                <span className="highlight">Emaily</span> Survey
              </Link>
            </h1>
          </div>
          <nav>
            <ul>{this.renderContent()}</ul>
          </nav>
        </div>
      </header>
    );
  }
}

function mapStateToProps(state) {
  // We just care about the 'auth' piece
  return { auth: state.auth };
}
// Equivalent to (by destruction):
// function mapStateToProps({ auth }) { return { auth }; }

export default connect(mapStateToProps)(Header);
