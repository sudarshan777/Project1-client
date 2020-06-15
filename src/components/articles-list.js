import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getArticlesList } from "../redux/actions/get-list";
import { connect } from "react-redux";
import axios from "axios";

const Article = (props) => (
  <div>
    <h4>
      <Link to={"/article/" + props.article._id}>{props.article.title}</Link>
    </h4>
    <p>{props.article.body}</p>
    <h6>
      <b>Author - </b> {props.article.user.name}
    </h6>
    <span>
      {"   "}
      {props.article.date.substring(0, 10)}
      {"      "}
      <button>
        <Link to={"/edit/" + props.article._id}>edit</Link>
      </button>
      {"   "}
      <button>
        {" "}
        <a
          href="#"
          onClick={() => {
            props.deleteArticle(props.article._id);
          }}
        >
          Delete
        </a>
      </button>
    </span>

    <hr />
  </div>
);

class ArticlesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
    };
  }

  componentDidMount() {
    this.props.dispatch(getArticlesList());
  }

  deleteArticle = (id) => {
    // this.props.dispatch(deleteArticle(emp._id));
  };
  articleList = () => {
    return this.props.articles.map((currentArticle) => {
      return (
        <Article
          article={currentArticle}
          deleteArticle={this.deleteArticle}
          key={currentArticle._id}
        />
      );
    });
  };

  render() {
    return (
      <div>
        <h2> Articles </h2>
        <div>{this.articleList()}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log("STATE" + JSON.stringify(state.articleListReducer.articles));
  return {
    articles: state.articleListReducer.articles,
  };
}

export default connect(mapStateToProps)(ArticlesList);
