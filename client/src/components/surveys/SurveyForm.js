// 'SurveyForm' shows a form for a user to add input
import _ from "lodash"; // Use map function here
import React, { Component } from "react";
// The `reduxForm` helper allows `redux-form` to communicate with our redux store.
// It is similar to the `connect` helper we used in the redux library.
// `Field` allows us to create any traditional html form elements.
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import SurveyField from "./SurveyField";
import validateEmails from "../../utils/validateEmails";
import formFields from "./formFields";

class SurveyForm extends Component {
  // Helper function to render a 'SurveyField'
  renderFields() {
    return _.map(formFields, field => {
      return (
        <Field
          key={field.name}
          component={SurveyField}
          type="text"
          label={field.label}
          name={field.name}
        />
      );
    });
  }

  render() {
    // 'handleSubmit()' is added by `redux-form` as props.
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

/**
 * Validation Function
 * @param values: contains all the values from the form
 **/
function validate(values) {
  // We return an error object.
  // If the returned object is empty, 'redux-form' assumes that the entire form is valid.
  const errors = {};

  // Provide an empty string if no email is entered.
  errors.recipients = validateEmails(values.recipients || "");

  // If no content is provided
  _.each(formFields, ({ name }) => {
    if (!values[name]) {
      errors[name] = `You must provide a ${name}.`;
    }
  });

  return errors;
}

// It takes only one argument object with the configurations how we want the form to behave.
export default reduxForm({
  validate,
  form: "surveyForm",
  destroyOnUnmount: false
})(SurveyForm);
