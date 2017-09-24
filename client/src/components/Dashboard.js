import React from "react";
import { Link } from "react-router-dom";
import SurveyList from "./surveys/SurveyList";
import Payments from "./Payments";

const Dashboard = () => {
  return (
    <div className="container container-main">
      <h3>My Surveys</h3>
      <Link to="/surveys/new" className="btn m-r-2">
        <i className="fa fa-magic" /> Create Survey
      </Link>
      <Payments />
      <br />
      <br />
      <SurveyList />
      <div className="fixed-action-btn">
        <Link to="/surveys/new" className="btn-floating btn-large">
          <i className="material-icons">add</i>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
