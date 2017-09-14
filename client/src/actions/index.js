import axios from "axios";
import { FETCH_USER } from "./types";

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
