// 'SurveyForm' shows a form for a user to add input
import React, { Component } from 'react';
// The `reduxForm` helper allows `redux-form` to communicate with our redux store.
// It is similar to the `connect` helper we used in the redux library.
// `Field` allows us to create any traditional html form elements.
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';

class SurveyForm extends Component {
  // Helper function to render a 'SurveyField'
  renderFields() {
    return (
      <div>
        <Field type="text" name="title" component={SurveyField} />
      </div>
    );
  }

  render() {
    // 'handleSubmit()' is added by `redux-form` as props.
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
          {this.renderFields()}
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

// It takes only one argument object with the configurations how we want the form to behave.
export default reduxForm({
  form: 'surveyForm'
})(SurveyForm);
