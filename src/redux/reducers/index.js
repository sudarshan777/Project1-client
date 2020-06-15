import { combineReducers } from "redux";

import authReducer from "./authReducer";
import articleListReducer from "./articleListReducer";

// cont rootReducer = combineReducers({auth})
export default combineReducers({
  authReducer,
  articleListReducer,
});
