import { combineReducers } from "redux";
import authReducer from "./authReducer";

// The keys passed into the 'combineReducers' will be the keys of our state.
export default combineReducers({
  auth: authReducer
});
