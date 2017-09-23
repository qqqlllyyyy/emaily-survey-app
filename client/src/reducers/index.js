import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import authReducer from "./authReducer";
import surveysReducer from "./surveysReducer";

// The keys passed into the 'combineReducers' will be the keys of our state.
export default combineReducers({
  auth: authReducer,
  form: reduxForm, // Access data as 'this.props.form' in other components
  surveys: surveysReducer
});
