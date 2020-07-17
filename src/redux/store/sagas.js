import {
  takeEvery,
  call,
  put,
  select,
  take,
  fork,
  all,
  takeLatest,
} from "redux-saga/effects";
import * as Types from "../actions/types";
import { GetDataFromServer, deleteService } from "../service";

const baseUrl = "https://mern-article.herokuapp.com";
// const baseUrl = "http://localhost:5000";

function* fetchLoginUser(action) {
  try {
    console.log("saga");
    console.log("Action->" + JSON.stringify(action));
    let formBody = {};
    formBody.email = action.email;
    formBody.password = action.password;

    const loginUrl = baseUrl + "/auth";
    const response = yield call(GetDataFromServer, loginUrl, "POST", formBody);

    const result = yield response.json();
    console.log("Result ->" + JSON.stringify(result));
    console.log("Result Json" + result);
    if (result.error) {
      yield put({
        type: "LOGIN_USER_SERVER_RESPONSE_ERROR",
        error: result.error,
      });
    } else {
      yield put({ type: Types.LOGIN_USER_SERVER_RESPONSE_SUCCESS, result });
    }
  } catch (error) {
    // yield put({ type: Types.SERVER_CALL_FAILED, error: error.message });
    console.log(error);
  }
}

function* listArticles(action) {
  console.log("Get Action->" + JSON.stringify(action));

  const reqMethod = "GET";
  const loginUrl = baseUrl + "/articles";

  const response = yield call(GetDataFromServer, loginUrl, "", "");

  const result = yield response.json();

  console.log("Result->" + JSON.stringify(result));
  if (result.error) {
    yield put({ type: Types.ARTICLE_LIST_ERROR_RESPONSE, result });
  } else {
    yield put({ type: Types.ARTICLE_LIST_SUCCESS_RESPONSE, result });
  }
}
function* getUser(action) {
  console.log("Get Action->" + JSON.stringify(action));

  const reqMethod = "GET";
  const loginUrl = baseUrl + "/user/" + action._id;

  const response = yield call(GetDataFromServer, loginUrl, "", "");

  const result = yield response.json();

  console.log("Result->" + JSON.stringify(result));
  if (result.error) {
    yield put({ type: Types.GET_USER_ERROR_RESPONSE, result });
  } else {
    yield put({ type: Types.GET_USER_SUCCESS_RESPONSE, result });
  }
}

function* getBookmarks(action) {
  console.log("Get Action->" + JSON.stringify(action));

  const reqMethod = "GET";
  const loginUrl = baseUrl + "/user/bookmarks/" + action._id;

  const response = yield call(GetDataFromServer, loginUrl, "", "");

  const result = yield response.json();

  console.log("Result->" + JSON.stringify(result));
  if (result.error) {
    yield put({ type: Types.GET_BOOKMARKS_ERROR_RESPONSE, result });
  } else {
    yield put({ type: Types.GET_BOOKMARKS_SUCCESS_RESPONSE, result });
  }
}

function* getArticleDetails(action) {
  console.log("Get Action->" + JSON.stringify(action));

  const reqMethod = "GET";
  const loginUrl = baseUrl + "/articles/" + action._id;

  const response = yield call(GetDataFromServer, loginUrl, "", "");

  const result = yield response.json();

  console.log("Result->" + JSON.stringify(result));
  if (result.error) {
    yield put({
      type: Types.GET_ARTICLE_DETAILS_SERVER_RESPONSE_ERROR,
      result,
    });
  } else {
    yield put({
      type: Types.GET_ARTICLE_DETAILS_SERVER_RESPONSE_SUCCESS,
      result,
    });
  }
}

function* getArticleComments(action) {
  console.log("Get Action->" + JSON.stringify(action));

  const reqMethod = "GET";
  const loginUrl = baseUrl + "/comments/get/article/" + action._id;

  const response = yield call(GetDataFromServer, loginUrl, "", "");

  const result = yield response.json();

  console.log("Result->" + JSON.stringify(result));
  if (result.error) {
    yield put({
      type: Types.GET_ARTICLE_COMMENTS_SERVER_RESPONSE_ERROR,
      result,
    });
  } else {
    yield put({
      type: Types.GET_ARTICLE_COMMENTS_SERVER_RESPONSE_SUCCESS,
      result,
    });
  }
}
function* getArticleLikes(action) {
  console.log("Get Action->" + JSON.stringify(action));

  const reqMethod = "GET";
  const loginUrl = baseUrl + "/like/article/all_users/" + action._id;

  const response = yield call(GetDataFromServer, loginUrl, "", "");

  const result = yield response.json();

  console.log("Result->" + JSON.stringify(result));
  if (result.error) {
    yield put({
      type: Types.GET_ARTICLE_LIKES_SERVER_RESPONSE_ERROR,
      result,
    });
  } else {
    yield put({
      type: Types.GET_ARTICLE_LIKES_SERVER_RESPONSE_SUCCESS,
      result,
    });
  }
}

function* saveArticleDetails(action) {
  try {
    console.log(
      "CREATE ARTICLE Action->" + JSON.stringify(action.articleDetails)
    );

    let formBody = {};
    formBody = action.articleDetails;
    console.log("FormBody" + JSON.stringify(formBody));

    const reqMethod = "POST";

    const loginUrl = baseUrl + "/articles/add";
    const response = yield call(GetDataFromServer, loginUrl, "POST", formBody);
    const result = yield response.json();
    console.log("Result Json" + JSON.stringify(result));
    if (result.error) {
      yield put({
        type: Types.CREATE_ARTICLE_DETAILS_SERVER_RESPONSE_ERROR,
        error: result.error,
      });
    } else {
      yield put({
        type: Types.CREATE_ARTICLE_DETAILS_SERVER_RESPONSE_SUCCESS,
        result,
      });
      console.log("ARTICLE DETAILS" + JSON.stringify(result));
    }
  } catch (error) {
    // yield put({ type: Types.SERVER_CALL_FAILED, error: error.message });
    console.log(error);
  }
}

function* deleteArticleDetails(action) {
  console.log("DELETE  ARTICLE ACTION" + JSON.stringify(action));
  try {
    // Ensure that your API returns the data of the updated todo
    let formBody = {};
    formBody._id = action._id;
    //const deleteApi = "http://localhost:5066/delete-project";
    const deleteApi = baseUrl + "/articles/" + action._id;
    const newData = yield call(deleteService, formBody, deleteApi); // Refer sample to api calls in remote.js file
    yield put({ type: Types.DELETE_ARTICLE_SUCCESS, newData }); // pass in the id you updated and the newData returned from the API
    /// Other things can go here depending on what you want
  } catch (e) {
    console.log("SAGA ERROR");
  }
}
function* postComment(action) {
  try {
    console.log("Post New Comment Action->" + JSON.stringify(action.comment));

    let formBody = {};
    formBody = action.comment;
    console.log("FormBody" + JSON.stringify(formBody));

    const postUrl = baseUrl + "/comments/post/article/" + action._id;
    const response = yield call(GetDataFromServer, postUrl, "POST", formBody);
    const result = yield response.json();
    console.log("Result Json" + JSON.stringify(result));
    if (result.error) {
      yield put({
        type: Types.POST_COMMENT_ARTICLE_DETAILS_SERVER_RESPONSE_ERROR,
        error: result.error,
      });
    } else {
      yield put({
        type: Types.POST_COMMENT_ARTICLE_DETAILS_SERVER_RESPONSE_SUCCESS,
        result,
      });
      console.log("Comment DETAILS" + JSON.stringify(result));
    }
  } catch (error) {
    // yield put({ type: Types.SERVER_CALL_FAILED, error: error.message });
    console.log(error);
  }
}
function* editComment(action) {
  try {
    console.log(" Edit Comment Action->" + JSON.stringify(action.comment));

    let formBody = {};
    formBody = action.comment;
    console.log("FormBody" + JSON.stringify(formBody));

    const postUrl =
      baseUrl +
      "/comments/edit/" +
      action.comment_id +
      "/user/" +
      action.user_id;

    const response = yield call(GetDataFromServer, postUrl, "POST", formBody);
    const result = yield response.json();
    console.log("Result Json" + JSON.stringify(result));
    if (result.error) {
      yield put({
        type: Types.EDIT_COMMENT_ARTICLE_SERVER_RESPONSE_ERROR,
        error: result.error,
      });
    } else {
      yield put({
        type: Types.EDIT_COMMENT_ARTICLE_SERVER_RESPONSE_SUCCESS,
        result,
      });
      console.log("Edit Comment DETAILS" + JSON.stringify(result));
    }
  } catch (error) {
    // yield put({ type: Types.SERVER_CALL_FAILED, error: error.message });
    console.log(error);
  }
}
function* deleteComment(action) {
  console.log("DELETE COMMENT ACTION" + JSON.stringify(action));
  try {
    // Ensure that your API returns the data of the updated todo
    let formBody = {};
    // formBody._id = action._id;
    const deleteApi =
      baseUrl +
      "comments/delete/" +
      action.comment_id +
      "/user/" +
      action.user_id;
    const result = yield call(deleteService, formBody, deleteApi); // Refer sample to api calls in remote.js file
    /// Other things can go here depending on what you want

    if (result.error) {
      yield put({
        type: Types.DELETE_COMMENT_ARTICLE_SERVER_RESPONSE_ERROR,
        result,
      }); // pass in the id you updated and the newData returned from the API
    } else {
      yield put({
        type: Types.DELETE_COMMENT_ARTICLE_SERVER_RESPONSE_SUCCESS,
        result,
      }); // pass in the id you updated and the newData returned from the API
    }
    console.log("Comment DELETE" + JSON.stringify(result));
  } catch (e) {
    console.log("SAGA ERROR");
  }
}
function* postBookmark(action) {
  try {
    console.log("Post New Bookmark Action->" + JSON.stringify(action.comment));

    let formBody = {};
    formBody.user = action.user_id;
    console.log("FormBody" + JSON.stringify(formBody));

    const postUrl = baseUrl + "/articles/bookmark/" + action.article_id;
    const response = yield call(GetDataFromServer, postUrl, "POST", formBody);
    const result = yield response.json();
    console.log("Result Json" + JSON.stringify(result));
    if (result.error) {
      yield put({
        type: Types.BOOKMARK_ARTICLE_ERROR_RESPONSE,
        error: result.error,
      });
    } else {
      yield put({
        type: Types.BOOKMARK_ARTICLE_ERROR_RESPONSE,
        result,
      });
    }
    console.log("BOOKMARK DETAILS" + JSON.stringify(result));
  } catch (error) {
    // yield put({ type: Types.SERVER_CALL_FAILED, error: error.message });
    console.log(error);
  }
}
function* deleteBookmark(action) {
  try {
    console.log("Delete Bookmark Action->" + JSON.stringify(action.article_id));

    let formBody = {};
    formBody.user = action.user_id;
    console.log("FormBody" + JSON.stringify(formBody));

    const postUrl = baseUrl + "/articles/bookmark/" + action.article_id;
    const response = yield call(GetDataFromServer, postUrl, "POST", formBody);
    const result = yield response.json();
    console.log("Result Json" + JSON.stringify(result));
    if (result.error) {
      yield put({
        type: Types.UN_BOOKMARK_ARTICLE_ERROR_RESPONSE,
        error: result.error,
      });
    } else {
      yield put({
        type: Types.UN_BOOKMARK_ARTICLE_SUCCESS_RESPONSE,
        result,
      });
      console.log(" Remove BOOKMARK DETAILS" + JSON.stringify(result));
    }
  } catch (error) {
    // yield put({ type: Types.SERVER_CALL_FAILED, error: error.message });
    console.log(error);
  }
}

function* postLike(action) {
  try {
    console.log("Post New Like Action->" + JSON.stringify(action.comment));

    let formBody = {};
    formBody.user = action.user_id;
    console.log("FormBody" + JSON.stringify(formBody));

    const postUrl = baseUrl + "/like/post/article/" + action.article_id;
    const response = yield call(GetDataFromServer, postUrl, "POST", formBody);
    const result = yield response.json();
    console.log("Result Json" + JSON.stringify(result));
    if (result.error) {
      yield put({
        type: Types.LIKE_ARTICLE_ERROR_RESPONSE,
        error: result.error,
      });
    } else {
      yield put({
        type: Types.LIKE_ARTICLE_SUCCESS_RESPONSE,
        result,
      });
      console.log("LIKE DETAILS" + JSON.stringify(result));
    }
  } catch (error) {
    // yield put({ type: Types.SERVER_CALL_FAILED, error: error.message });
    console.log(error);
  }
}

function* deleteArticleLike(action) {
  console.log("DELETE  ARTICLE LIKE ACTION" + JSON.stringify(action));
  try {
    // Ensure that your API returns the data of the updated todo
    let formBody = {};
    formBody._id = action._id;
    const deleteApi = baseUrl + "/like/" + action.like_id;
    const result = yield call(deleteService, formBody, deleteApi); // Refer sample to api calls in remote.js file
    /// Other things can go here depending on what you want

    if (result.error) {
      yield put({ type: Types.DELETE_LIKE_ARTICLE_ERROR_RESPONSE, result }); // pass in the id you updated and the newData returned from the API
    } else {
      yield put({ type: Types.DELETE_LIKE_ARTICLE_SUCCESS_RESPONSE, result }); // pass in the id you updated and the newData returned from the API
    }
    console.log("LIKE DELETE DETAILS" + JSON.stringify(result));
  } catch (e) {
    console.log("SAGA ERROR");
  }
}

function* getFollowers(action) {
  console.log("Get Action->" + JSON.stringify(action));

  const reqMethod = "GET";
  const loginUrl = baseUrl + "/user/followers/" + action._id;

  const response = yield call(GetDataFromServer, loginUrl, "", "");

  const result = yield response.json();

  console.log("Result->" + JSON.stringify(result));
  if (result.error) {
    yield put({ type: Types.GET_FOLLOWERS_ERROR_RESPONSE, result });
  } else {
    yield put({ type: Types.GET_FOLLOWERS_SUCCESS_RESPONSE, result });
  }
}
function* getFollowing(action) {
  console.log("Get Action->" + JSON.stringify(action));

  const reqMethod = "GET";
  const loginUrl = baseUrl + "/user/following/" + action._id;

  const response = yield call(GetDataFromServer, loginUrl, "", "");

  const result = yield response.json();

  console.log("Result->" + JSON.stringify(result));
  if (result.error) {
    yield put({ type: Types.GET_FOLLOWING_ERROR_RESPONSE, result });
  } else {
    yield put({ type: Types.GET_FOLLOWING_SUCCESS_RESPONSE, result });
  }
}

function* getUserArticles(action) {
  console.log("Get Action->" + JSON.stringify(action));

  const reqMethod = "GET";
  const loginUrl = baseUrl + "/user/articlesWritten/" + action._id;

  const response = yield call(GetDataFromServer, loginUrl, "", "");

  const result = yield response.json();

  console.log("Result->" + JSON.stringify(result));
  if (result.error) {
    yield put({
      type: Types.GET_USER_WRITTEN_ARTICLES_SERVER_RESPONSE_ERROR,
      result,
    });
  } else {
    yield put({
      type: Types.GET_USER_WRITTEN_ARTICLES_SERVER_RESPONSE_SUCCESS,
      result,
    });
  }
}
function* followUser(action) {
  try {
    console.log("Follow User Action->" + JSON.stringify(action.comment));

    let formBody = {};
    formBody.user = action.follow_id;
    console.log("FormBody" + JSON.stringify(formBody));

    const postUrl = baseUrl + "/user/" + action.user_id + "/follow";
    const response = yield call(GetDataFromServer, postUrl, "POST", formBody);
    const result = yield response.json();
    console.log("Result Json" + JSON.stringify(result));
    if (result.error) {
      yield put({
        type: Types.FOLLOW_USER_ERROR_RESPONSE,
        error: result.error,
      });
    } else {
      yield put({
        type: Types.FOLLOW_USER_ERROR_RESPONSE,
        result,
      });
      console.log("Follow details" + JSON.stringify(result));
    }
  } catch (error) {
    // yield put({ type: Types.SERVER_CALL_FAILED, error: error.message });
    console.log(error);
  }
}
function* unFollowUser(action) {
  try {
    console.log("Un Follow Use Action->" + JSON.stringify(action.comment));

    let formBody = {};
    formBody.user = action.unfollow_id;
    console.log("FormBody" + JSON.stringify(formBody));

    const postUrl = baseUrl + +"/user/" + action.user_id + "/follow";
    const response = yield call(GetDataFromServer, postUrl, "POST", formBody);
    const result = yield response.json();
    console.log("Result Json" + JSON.stringify(result));
    if (result.error) {
      yield put({
        type: Types.UN_FOLLOW_USER_ERROR_RESPONSE,
        error: result.error,
      });
    } else {
      yield put({
        type: Types.UN_FOLLOW_USER_ERROR_RESPONSE,
        result,
      });
      console.log("Un Follow details " + JSON.stringify(result));
    }
  } catch (error) {
    // yield put({ type: Types.SERVER_CALL_FAILED, error: error.message });
    console.log(error);
  }
}

function* signUpUser(action) {
  try {
    console.log("Submit Action->" + JSON.stringify(action));
    let formBody = {};
    formBody.user = action.user;

    const signUpUrl = baseUrl + "/signup";
    const response = yield call(
      GetDataFromServer,
      signUpUrl,
      "POST",
      formBody.user
    );
    const result = yield response.json();
    console.log("Result Json" + result);
    if (result.error) {
      yield put({
        type: "SIGNUP_USER_SERVER_RESPONSE_ERROR",
        error: result.error,
      });
    } else {
      yield put({ type: Types.SIGNUP_USER_SERVER_RESPONSE_SUCCESS, result });
    }
  } catch (error) {
    // yield put({ type: Types.SERVER_CALL_FAILED, error: error.message });
    console.log(error);
  }
}

function* getArticlesLiked(action) {
  console.log("Get Action->" + JSON.stringify(action));

  const reqMethod = "GET";
  const loginUrl = baseUrl + "/like/user/all_articles/" + action._id;

  const response = yield call(GetDataFromServer, loginUrl, "", "");

  const result = yield response.json();

  console.log("Result->" + JSON.stringify(result));
  if (result.error) {
    yield put({
      type: Types.GET_ARTICLES_LIKED_ERROR_RESPONSE,
      result,
    });
  } else {
    yield put({
      type: Types.GET_ARTICLES_LIKED_SUCCESS_RESPONSE,
      result,
    });
  }
}
export default function* rootSaga(params) {
  yield takeLatest(Types.LOGIN_USER, fetchLoginUser);
  yield takeEvery(Types.ARTICLE_LIST, listArticles);
  yield takeEvery(Types.CREATE_ARTICLE, saveArticleDetails);
  yield takeEvery(Types.DELETE_ARTICLE, deleteArticleDetails);
  yield takeEvery(Types.SIGNUP_USER, signUpUser);
  yield takeEvery(Types.GET_USER, getUser);
  yield takeEvery(Types.GET_ARTICLE_DETAILS, getArticleDetails);
  yield takeEvery(Types.POST_COMMENT_ARTICLE, postComment);
  yield takeEvery(Types.EDIT_COMMENT_ARTICLE, editComment);
  yield takeEvery(Types.DELETE_COMMENT_ARTICLE, deleteComment);
  yield takeEvery(Types.BOOKMARK_ARTICLE, postBookmark);
  yield takeEvery(Types.UN_BOOKMARK_ARTICLE, deleteBookmark);
  yield takeEvery(Types.LIKE_ARTICLE, postLike);
  yield takeEvery(Types.FOLLOW_USER, followUser);
  yield takeEvery(Types.UN_FOLLOW_USER, unFollowUser);
  yield takeEvery(Types.GET_BOOKMARKS, getBookmarks);
  yield takeEvery(Types.GET_FOLLOWERS, getFollowers);
  yield takeEvery(Types.GET_FOLLOWERS, getFollowers);
  yield takeEvery(Types.GET_FOLLOWING, getFollowing);
  yield takeEvery(Types.GET_USER_WRITTEN_ARTICLES, getUserArticles);
  yield takeEvery(Types.GET_ARTICLE_COMMENTS, getArticleComments);
  yield takeEvery(Types.GET_ARTICLE_LIKES, getArticleLikes);
  yield takeEvery(Types.DELETE_LIKE_ARTICLE, deleteArticleLike);
  yield takeEvery(Types.GET_ARTICLES_LIKED, getArticlesLiked);
  console.log("ROOT SAGA");
}
