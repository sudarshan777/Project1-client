import React from "react";
import Article from "./article";

const ArticlesList = (props) => {
  console.log("Article List Props -", props.articles);
  console.log("Type of Article List Props -", typeof props.articles);

  console.log(" Props -", props);
  console.log("Type of Props -", typeof props);

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
