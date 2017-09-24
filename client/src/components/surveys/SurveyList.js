import React, { Component } from "react";
import { connect } from "react-redux";
// Import the action creator
import { fetchSurveys } from "../../actions";

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  // Helper method the render surveys
  renderSurveys() {
    if (this.props.surveys.length > 0) {
      // 'reverse()' will show the newest survey on the top
      return this.props.surveys.reverse().map(survey => {
        return (
          <div className="card darken-1" key={survey._id}>
            <div className="card-content">
              <span className="card-title">{survey.title}</span>
              <p>{survey.body}</p>
              <p className="right">
                Sent On: {new Date(survey.dateSent).toLocaleDateString()}
              </p>
            </div>
            <div className="card-action">
              <a>Yes: {survey.yes}</a>
              <a>No: {survey.no}</a>
            </div>
          </div>
        );
      });
    } else {
      return <p>Please create your first survey</p>;
    }
  }

  render() {
    return <div>{this.renderSurveys()}</div>;
  }
}

// Destructured `state`
function mapStateToProps({ surveys }) {
  return { surveys };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
