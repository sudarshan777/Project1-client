import * as Types from "./types";

export const createArticleDetailsSubmit = (articleDetails) => {
  return {
    type: Types.CREATE_ARTICLE,
    articleDetails,
  };
};

export const postNewComment = (_id, comment) => {
  return {
    type: Types.POST_COMMENT_ARTICLE,
    _id,
    comment,
  };
};
// export const deleteComment = (_id, comment) => {
//   return {
//     type: Types.DELETE_COMMENT_ARTICLE,
//     _id,
//   };
// };

export const listArticleDetails = (_id) => {
  return {
    type: Types.GET_ARTICLE,
    _id,
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


export const bookmarkArticle = (article_id,user_id) => {
  return {
    type: Types.BOOKMARK_ARTICLE,
    article_id,
    user_id,
  };
};
export const removeBookmarkArticle = (article_id,user_id) => {
  return {
    type: Types.UN_BOOKMARK_ARTICLE,
    article_id,
    user_id,
  };
};

// export const editArticle = (_id) => {
//   return {
//     type: Types.EDIT_ARTICLE_GET_DETAILS,
//     _id,
//   };
// };
