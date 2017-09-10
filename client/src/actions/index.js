import axios from "axios";
import { FETCH_USER } from "./types";

// Return an async function whose argument is 'dispatch'
export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};
