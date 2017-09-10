import { FETCH_USER } from "../actions/types";

/**
 * @param The state
 * @param The action object
 */
export default function(state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      // action.payload will be an empty string if the user is not logged in.
      // It is the user model if the user is logged in.
      return action.payload || false;
    default:
      return state; // No change to our state
  }
}
