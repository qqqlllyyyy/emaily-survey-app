import { FETCH_SURVEYS } from "../actions/types";

// Return an empty array by default
export default function(state = [], action) {
  switch (action.type) {
    case FETCH_SURVEYS:
      return action.payload;
    default:
      return state;
  }
}
