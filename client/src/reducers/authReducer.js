//------------------------------------------------------------------------------------------------
// This authReducer handles the state of auth, required for the user's login.
//------------------------------------------------------------------------------------------------
import { FETCH_USER } from '../actions/types';

export default function(state = null, action = null) {
  switch (action.type) {
    case FETCH_USER: {
      if (action.payload.error) return false;
      return action.payload || false;
    }
    default:
      return state;
  }
}
