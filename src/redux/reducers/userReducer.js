import * as Types from "../actions/types";

const initialUserObj = {
  user: {},
  bookmarks: [],
  followers: [],
  following: [],
  articles: [],
  articlesLiked: [],
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
const getBookmarksSuccessResponse = (state, action) => {
  console.log("REdux" + JSON.stringify(action));
  let newState = { ...state };
  if (action.result !== undefined) {
    newState = Object.assign({}, state, {
      bookmarks: JSON.parse(JSON.stringify(action.result.bookmarks)),
    });
    console.log("New Bookmarks" + JSON.stringify(newState));
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

const getFollowersSuccessResponse = (state, action) => {
  console.log("REdux" + JSON.stringify(action));
  let newState = { ...state };
  if (action.result !== undefined) {
    newState = Object.assign({}, state, {
      followers: JSON.parse(JSON.stringify(action.result.followers)),
    });
    console.log("New" + JSON.stringify(newState));
  }
  return { ...newState };
};
const getFollowingSuccessResponse = (state, action) => {
  console.log("REdux" + JSON.stringify(action));
  let newState = { ...state };
  if (action.result !== undefined) {
    newState = Object.assign({}, state, {
      following: JSON.parse(JSON.stringify(action.result.following)),
    });
    console.log("New" + JSON.stringify(newState));
  }
  return { ...newState };
};

const getArticlesSuccessResponse = (state, action) => {
  console.log("REdux" + JSON.stringify(action));
  let newState = { ...state };
  if (action.result !== undefined) {
    newState = Object.assign({}, state, {
      articles: JSON.parse(JSON.stringify(action.result)),
    });
    console.log("New" + JSON.stringify(newState));
  }
  return { ...newState };
};

const getArticlesLikedSuccessResponse = (state, action) => {
  console.log("REdux" + JSON.stringify(action));
  let newState = { ...state };
  if (action.result !== undefined) {
    newState = Object.assign({}, state, {
      articlesLiked: JSON.parse(JSON.stringify(action.result)),
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
    //un follow user
    case Types.UN_FOLLOW_USER:
      return { ...state };
    case Types.UN_FOLLOW_USER_SUCCESS_RESPONSE:
      return unFollowUserSuccessResponse(state, action);
    case Types.UN_FOLLOW_USER_ERROR_RESPONSE:
      return { ...state };

    // get bookmarks

    case Types.GET_BOOKMARKS:
      return { ...state };
    case Types.GET_BOOKMARKS_SUCCESS_RESPONSE:
      return getBookmarksSuccessResponse(state, action);
    case Types.GET_BOOKMARKS_ERROR_RESPONSE:
      return { ...state };

    // get followers

    case Types.GET_FOLLOWERS:
      return { ...state };
    case Types.GET_FOLLOWERS_SUCCESS_RESPONSE:
      return getFollowersSuccessResponse(state, action);
    case Types.GET_FOLLOWERS_ERROR_RESPONSE:
      return { ...state };

    // get following

    case Types.GET_FOLLOWING:
      return { ...state };
    case Types.GET_FOLLOWING_SUCCESS_RESPONSE:
      return getFollowingSuccessResponse(state, action);
    case Types.GET_FOLLOWING_ERROR_RESPONSE:
      return { ...state };

    // get user written articles

    case Types.GET_USER_WRITTEN_ARTICLES:
      return { ...state };
    case Types.GET_USER_WRITTEN_ARTICLES_SERVER_RESPONSE_SUCCESS:
      return getArticlesSuccessResponse(state, action);
    case Types.GET_USER_WRITTEN_ARTICLES_SERVER_RESPONSE_ERROR:
      return { ...state };

    // get articles liked

    case Types.GET_ARTICLES_LIKED:
      return { ...state };
    case Types.GET_ARTICLES_LIKED_SUCCESS_RESPONSE:
      return getArticlesLikedSuccessResponse(state, action);
    case Types.GET_ARTICLES_LIKED_ERROR_RESPONSE:
      return { ...state };

    default:
      return state;
  }
};
