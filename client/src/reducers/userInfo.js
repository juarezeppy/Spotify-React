//------------------------------------------------------------------------------------------------
// The userInfo.js reducer function handles the user's state, returning a new state with the
// information we want from the user's account.
//------------------------------------------------------------------------------------------------
import { FETCH_USER } from '../actions/types';
import defaultImage from '../assets/unknown.jpeg';

const defaultState = {
  displayName: '',
  imageURL: '',
  externalURL: ''
};

export default function(state = defaultState, action = null) {
  switch (action.type) {
    case FETCH_USER: {
      const newState = { ...state };

      //if the user doesn't have a photo, set a default one
      try {
        newState.imageURL = action.payload.images ? action.payload.images[0].url : null;
      } catch {
        newState.imageURL = defaultImage;
      }

      newState.displayName = action.payload.display_name
        ? action.payload.display_name
        : null;

      newState.externalURL = action.payload.external_urls
        ? action.payload.external_urls.spotify
        : null;

      return newState || false;
    }
    default:
      return state;
  }
}
