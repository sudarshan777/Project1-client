import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getArticlesList } from "../redux/actions/get-list";
import { deleteArticle } from "../redux/actions/articlesActions";
import { connect } from "react-redux";
import Article from "./article";

const ArticlesList = (props) => {
  console.log(props);
  if (props.articles !== undefined) {
    return props.articles.map((currentArticle) => {
      return (
        <div key={currentArticle._id}>
          <Article article={currentArticle} />
          <br />
        </div>
      );
    });
  } else return null;

  // return null;
};

export default ArticlesList;
