import * as Types from "../actions/types";

const initialUserObj = {
  user: {},
  message: "",
};

const getUserError = (state) => {
  let newState = { ...state };
  return { ...newState };
};

const getUserSuccessResponse = (state, action) => {
  console.log("REdux" + JSON.stringify(action));
  let newState = { ...state };
  if (action.result !== undefined) {
    newState = Object.assign({}, state, {
      user: JSON.parse(JSON.stringify(action.result)),
    });
    console.log("New" + JSON.stringify(newState));
  }
  return { ...newState };
};
const followUserSuccessResponse = (state, action) => {
  console.log("REdux" + JSON.stringify(action));
  let newState = { ...state };
  if (action.result !== undefined) {
    newState = Object.assign({}, state, {
      message: JSON.parse(JSON.stringify(action.result)),
    });
    console.log("New" + JSON.stringify(newState));
  }
  return { ...newState };
};

const unFollowUserSuccessResponse = (state, action) => {
  console.log("REdux" + JSON.stringify(action));
  let newState = { ...state };

  if (action.result !== undefined) {
    newState = Object.assign({}, state, {
      message: JSON.parse(JSON.stringify(action.result)),
    });
    console.log("New" + JSON.stringify(newState));
  }
  return { ...newState };
};

export default (state = initialUserObj, action = {}) => {
  switch (action.type) {
    case Types.GET_USER:
      return { ...state };
    case Types.GET_USER_SUCCESS_RESPONSE:
      return getUserSuccessResponse(state, action);
    case Types.GET_USER_ERROR_RESPONSE:
      return getUserError(state);

    // follow user
    case Types.FOLLOW_USER:
      return { ...state };
    case Types.FOLLOW_USER_SUCCESS_RESPONSE:
      return followUserSuccessResponse(state, action);
    case Types.FOLLOW_USER_ERROR_RESPONSE:
      return { ...state };

    case Types.UN_FOLLOW_USER:
      return { ...state };
    case Types.UN_FOLLOW_USER_SUCCESS_RESPONSE:
      return unFollowUserSuccessResponse(state, action);
    case Types.UN_FOLLOW_USER_ERROR_RESPONSE:
      return { ...state };

    // un follow user

    default:
      return state;
  }
};
