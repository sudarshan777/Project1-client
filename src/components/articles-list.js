import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getArticlesList } from "../redux/actions/get-list";
import { deleteArticle } from "../redux/actions/articlesActions";
import { connect } from "react-redux";

const Article = (props) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">
          <Link to={"/article/" + props.article._id}>
            {props.article.title}
          </Link>
        </h5>
        <p className="card-text">{props.article.body}</p>
        <b>Likes -{props.article.likes} </b>
        <br />
        <b>Author - </b>{" "}
        <Link to={"/user/" + props.article.user._id}>
          {props.article.user.name}
        </Link>
        <br />
        <b>Created at - </b> {props.article.date.substring(0, 10)}
        <br />
        <br/>
        
        {/* {props.article.user._id === props.userId ? (
          <a
            href="#"
            onClick={() => {
              props.deleteArticle(props.article._id);
            }}
            className="btn btn-primary"
          >
            Delete
          </a>
        ) : null} */}
        
      </div>
    </div>
  );
};

class ArticlesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
    };
  }

  componentDidMount() {
    if (!this.props.show) this.props.dispatch(getArticlesList());
    // const mad = Object.values(this.props.articles);
    // console.log(mad);
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    // if (this.props.articles !== prevProps.articles) {
    //   this.props.dispatch(getArticlesList());
    // }
  }

  deleteArticle = (id) => {
    this.props.dispatch(deleteArticle(id));
  };
  articleList = () => {
    // console.log(this.props.articles.articles);

    if (this.props.show && this.props.userArticles !== undefined) {
      console.log(this.props.userArticles);
      return this.props.userArticles.map((currentArticle) => {
        return (
          <div key={currentArticle._id}>
            <Article
              article={currentArticle}
              deleteArticle={this.deleteArticle}
              userId={this.props.user.id}
            />
            <br />
          </div>
        );
      });
    }

    return this.props.articles.map((currentArticle) => {
      return (
        <div key={currentArticle._id}>
          <Article
            article={currentArticle}
            deleteArticle={this.deleteArticle}
            userId={this.props.user.id}
          />
          <br />
        </div>
      );
    });
    // } else return null;
  };

  render() {
    return (
      <div>
        <h2> Articles </h2>
        {this.articleList()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(
    "ARTICLE-LIST STATE " + JSON.stringify(state.articleListReducer.articles)
  );
  console.log(
    "USER-ARTICLE-LIST STATE " +
      JSON.stringify(state.userReducer.user.articlesWritten)
  );
  return {
    articles: state.articleListReducer.articles,
    userArticles: state.userReducer.user.articlesWritten,
    user: state.authReducer.user,
  };
}

export default connect(mapStateToProps)(ArticlesList);
