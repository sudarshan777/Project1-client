import * as Types from "../actions/types";

const initialUserObj = {
  loggedIn: false,
  pending: false,
  token: "",
  user: {},
};

const handleLoginServerResponseSuccess = (state, action) => {
  console.log("REdux" + JSON.stringify(state));
  let newState = { ...state };
  if (action.result !== undefined ) {
    newState = Object.assign({}, state, {
      loggedIn: true,
      pending:false,
      token: action.result.token,
      user: Object.assign({}, action.result.user),
    });
  }
  console.log("STATE->" + JSON.stringify(newState));
  return { ...newState };
};
const handleLoginServerResponseError = (state, action) => {
  let newState = { ...state };
  return { ...newState };
};

export default (state = initialUserObj, action) => {
  switch (action.type) {
    case Types.LOGIN_USER:
      return Object.assign({}, state, {
        loggedIn: false,
        pending: true,
      });
    case Types.LOGIN_USER_SERVER_RESPONSE_ERROR:
      return handleLoginServerResponseError(state);
    case Types.LOGIN_USER_SERVER_RESPONSE_SUCCESS:
      return handleLoginServerResponseSuccess(state, action);

    default:
      return state;
  }
};
