import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Article = (props) => (
  <div>
    <h4>{props.article.title}</h4>
    <p>{props.article.body}</p>
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

export default class ArticlesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/articles/")
      .then((response) => {
        this.setState({
          articles: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteArticle = (id) => {
    axios
      .delete("http://localhost:5000/articles/" + id)
      .then((res) => console.log(res.data));
    this.setState({
      articles: this.state.articles.filter((el) => el._id !== id),
    });
  };
  articleList = () => {
    return this.state.articles.map((currentArticle) => {
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
