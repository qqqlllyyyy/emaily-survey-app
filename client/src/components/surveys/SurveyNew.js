// This should be a class-based component
// 'SurveyNew' shows 'SurveyForm' and 'SurveyFormReview'
import React, { Component } from "react";
import { reduxForm } from "redux-form";
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";

class SurveyNew extends Component {
  // Component-level state as a flag to toggle visibility
  // This line is equivalent to:
  /*
    constructor(props) {
      super(props);
      this.state = { showFormReview: false };
    }
  */
  state = { showFormReview: false };

  // Helper function to render content
  renderContent() {
    if (this.state.showFormReview) {
      return (
        <SurveyFormReview
          onCancel={() => this.setState({ showFormReview: false })}
        />
      );
    }
    return (
      <SurveyForm
        onSurveySubmit={() => this.setState({ showFormReview: true })}
      />
    );
  }

  render() {
    return (
      <div className="container container-main">
        <h3>Create Survey</h3>
        {this.renderContent()}
      </div>
    );
  }
}

// Use 'reduxForm' helper to clean form data when a user left the page.
export default reduxForm({
  form: "surveyForm"
})(SurveyNew);
