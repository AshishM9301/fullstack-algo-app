import { combineReducers } from "redux";

import authReducer from "./_authReducer";
import orderReducer from "./_orderReducer";

export default combineReducers({
  auth: authReducer,
  order: orderReducer,
});
