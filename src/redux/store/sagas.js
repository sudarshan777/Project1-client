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

const baseUrl = "http://localhost:5000";

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

function* saveArticleDetails(action) {
  try {
    console.log(
      "CREATE PROJECT Action->" + JSON.stringify(action.articleDetails)
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
  console.log("DELETE ACTION" + JSON.stringify(action));
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
  console.log("ROOT SAGA");
}
