import { combineReducers } from "redux";

import authReducer from "./authReducer";
import articleListReducer from "./articleListReducer";
import articlesReducer from "./articlesReducer";

// cont rootReducer = combineReducers({auth})
export default combineReducers({
  authReducer,
  articleListReducer,
  articlesReducer,
});
