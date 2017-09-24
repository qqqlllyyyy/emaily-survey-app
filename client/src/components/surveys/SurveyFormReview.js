// 'SurveyFormReview' shows users their form inputs for review.
import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import formFields from "./formFields";
import { withRouter } from "react-router-dom";
import * as actions from "../../actions";

// Deconstruct the 'props.onCancel' as 'onCancel'
// 'history' is created by the helper 'withRouter'
const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
  // All the fields to be rendered
  const reviewFields = _.map(formFields, ({ name, label }) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    );
  });

  // 'submitSurvey' is now a prop
  return (
    <div>
      <h5>Please confirm your entries</h5>
      {reviewFields}
      <br />
      <button className="yellow darken-3 btn-flat" onClick={onCancel}>
        Back
      </button>
      <button
        onClick={() => submitSurvey(formValues, history)}
        className="green btn-flat right white-text"
      >
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

// Take our redux state and transform them into some props,
// then send down to the component.
function mapStateToProps(state) {
  // console.log(state);
  return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
