// This should be a class-based component
// 'SurveyNew' shows 'SurveyForm' and 'SurveyFormReview'
import React, { Component } from 'react';
import SurveyForm from './SurveyForm';

class SurveyNew extends Component {
  render() {
    return (
      <div>
        <SurveyForm />
      </div>
    );
  }
}

export default SurveyNew;
