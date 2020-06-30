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

function* getArticle(action) {
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

    const postUrl = baseUrl + "/articles/comment/" + action._id;
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
      console.log("BOOKMARK DETAILS" + JSON.stringify(result));
    }
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

    const postUrl = baseUrl + "/articles/unbookmark/" + action.article_id;
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
function* followUser(action) {
  try {
    console.log("Follow User Action->" + JSON.stringify(action.comment));

    let formBody = {};
    formBody.user = action.follow_id;
    console.log("FormBody" + JSON.stringify(formBody));

    const postUrl = baseUrl + "/user/follow/" + action.user_id;
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

    const postUrl = baseUrl + "/user/unfollow/" + action.user_id;
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
export default function* rootSaga(params) {
  yield takeLatest(Types.LOGIN_USER, fetchLoginUser);
  yield takeEvery(Types.ARTICLE_LIST, listArticles);
  yield takeEvery(Types.CREATE_ARTICLE, saveArticleDetails);
  yield takeEvery(Types.DELETE_ARTICLE, deleteArticleDetails);
  yield takeEvery(Types.SIGNUP_USER, signUpUser);
  yield takeEvery(Types.GET_USER, getUser);
  yield takeEvery(Types.GET_ARTICLE, getArticle);
  yield takeEvery(Types.POST_COMMENT_ARTICLE, postComment);
  yield takeEvery(Types.BOOKMARK_ARTICLE, postBookmark);
  yield takeEvery(Types.UN_BOOKMARK_ARTICLE, deleteBookmark);
  yield takeEvery(Types.FOLLOW_USER, followUser);
  yield takeEvery(Types.UN_FOLLOW_USER, unFollowUser);
  console.log("ROOT SAGA");
}
