import { combineReducers } from "redux";

import authReducer from "./_authReducer";

export default combineReducers({
  auth: authReducer,
});
