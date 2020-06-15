import * as Types from "./types";

export const createArticleDetailsSubmit = (articleDetails) => {
  return {
    type: Types.CREATE_PROJECT,
    articleDetails,
  };
};

export const updateArticle = (articleDetails) => {
  return {
    type: Types.UPDATE_ARTICLE,
    articleDetails,
  };
};

export const listArticleDetails = (listArticle) => {
  return {
    type: Types.LIST_ARTICLE_DETAILS,
    listArticle,
  };
};

export const deleteArticle = (_id) => {
  console.log("Delete Id " + _id);
  return {
    type: Types.DELETE_ARTICLE,
    _id,
  };
};

export const deleteArticleSuccess = (_id) => {
  return {
    type: Types.DELETE_ARTICLE_SUCCESS,
    _id,
  };
};

export const editArticle = (_id) => {
  return {
    type: Types.EDIT_ARTICLE_GET_DETAILS,
    _id,
  };
};
