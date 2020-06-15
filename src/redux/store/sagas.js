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
  import { GetDataFromServer, deleteTodoAPI } from "../service";
  
  const baseUrl = "http://localhost:5000";
  
  function* fetchLoginUser(action) {
    try {
      console.log('saga');
      console.log("Action->" + JSON.stringify(action));
      let formBody = {};
      formBody.email = action.email;
      formBody.password = action.password;
     
      const loginUrl = baseUrl + '/auth';
      const response = yield call(GetDataFromServer, loginUrl, 'POST', formBody);
  
      const result = yield response.json();
    //   console.log("ADS" + result.workingdetails);
      console.log("Result ->" + JSON.stringify(result))
      console.log('Result Json' + result);
      if (result.error) {
        yield put({ type: "LOGIN_USER_SERVER_RESPONSE_ERROR", error: result.error });
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
    const loginUrl = baseUrl + '/articles';;
  
    const response = yield call(GetDataFromServer, loginUrl, "", "");
  
    const result = yield response.json();
  
  
    console.log("Result->" + JSON.stringify(result));
    if (result.error) {
      yield put({ type: Types.ARTICLE_LIST_ERROR_RESPONSE, result });
    } else {
      yield put({ type: Types.ARTICLE_LIST_SUCCESS_RESPONSE, result });
    }
  }
  
  export default function* rootSaga(params) {
    yield takeLatest(Types.LOGIN_USER, fetchLoginUser);
    yield takeEvery(Types.ARTICLE_LIST, listArticles);
  
    console.log("ROOT SAGA");
  }
  