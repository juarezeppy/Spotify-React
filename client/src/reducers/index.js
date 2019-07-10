//------------------------------------------------------------------------------------------------
// This file combines all reducers into one for use by the store object, which is declared in the
// top most index.js file right when react starts.
//------------------------------------------------------------------------------------------------
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userInfo from './userInfo';

export default combineReducers({
  auth: authReducer,
  userInfo
});
