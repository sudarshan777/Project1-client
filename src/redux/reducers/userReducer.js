import {
    GET_USER,
    GET_USER_SUCCESS_RESPONSE,
    GET_USER_ERROR_RESPONSE,
  } from "../actions/types";
  
  const initialUserObj = {
    user: {},
  };
  
  const getUserError = (state) => {
    let newState = { ...state };
    return { ...newState };
  };
  
  const getUserSuccessResponse = (state, action) => {
    //console.log("REdux" + JSON.stringify(action));
    let newState = { ...state };
    if (action.result !== undefined) {
      newState = Object.assign({}, state, {
        user: JSON.parse(JSON.stringify(action.result)),
      });
      console.log("New" + JSON.stringify(newState));
    }
    return { ...newState };
  };
  
  export default (state = initialUserObj, action = {}) => {
    switch (action.type) {
      case GET_USER:
        return { ...state };
      case GET_USER_SUCCESS_RESPONSE:
        return getUserSuccessResponse(state, action);
      case GET_USER_ERROR_RESPONSE:
        return getUserError(state);
  
      default:
        return state;
    }
  };
  