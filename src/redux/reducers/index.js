import { combineReducers } from "redux";

import authReducer from "./authReducer";
import articleListReducer from "./articleListReducer";
import articlesReducer from "./articlesReducer";
import userReducer from "./userReducer";

// cont rootReducer = combineReducers({auth})
export default combineReducers({
  authReducer,
  articleListReducer,
  articlesReducer,
  userReducer,
});
