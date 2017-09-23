import axios from "axios";
import { FETCH_USER, FETCH_SURVEYS } from "./types";

// Return an async function whose argument is 'dispatch'
export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};

// Handle token from Stripe API
export const handleToken = token => async dispatch => {
  const res = await axios.post("/api/stripe", token);
  // What type of action do we want to dispatch
  // We can use 'FETCH_USER' just like before
  dispatch({ type: FETCH_USER, payload: res.data });
};

// Submit the form
// Take the form values and make a post request to the back-end
export const submitSurvey = (values, history) => async dispatch => {
  // The API returns the updated user model,
  // which is defined in `./routes/surveyRoutes`
  const res = await axios.post("/api/surveys", values);

  // Navigate to another component using `history` by `withRouter`
  history.push("/surveys");

  // So we should also dispatch the type `FETCH_USER`
  // to update the user model in our application state.
  dispatch({ type: FETCH_USER, payload: res.data });
};

// Fetch a list of surveys
export const fetchSurveys = () => async dispatch => {
  const res = await axios.get("/api/surveys");
  dispatch({ type: FETCH_SURVEYS, payload: res.data });
};
