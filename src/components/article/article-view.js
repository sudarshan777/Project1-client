import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Like from "./Like";
import Bookmark from "./Bookmark";
import {
  postNewComment,
  listArticleDetails,
  listArticleComments,
  deleteArticle,
  listArticleLikes,
  deleteComment,
  editComment,
} from "../../redux/actions/articlesActions";
import { getBookmarks } from "../../redux/actions/get-user";

const Comments = (props) => {
  if (props.comments.length > 0 && props !== undefined) {
    return (
      <div>
        <h6>
          {" "}
          <b>Comments</b>
        </h6>
        <ul className="list-group">
          {props.comments.map((comment, index) => {
            return (
              <li className="list-group-item" key={index}>
                <p>{comment.body}</p>-
                <Link to={"/user/" + comment.user._id}>
                  {comment.user.name}
                </Link>
                <br />
                <b>Date - </b> {comment.createdAt.substring(0, 10)}
              </li>
            );
          })}
        </ul>
      </div>
    );
  } else return null;
};

class ArticleView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articleDetails: {
        title: "",
        body: "",
        user_id: "",
        user_name: "",
      },
      newComment: "",
      showComments: false,
    };
  }
  componentDidMount() {
    this.props.dispatch(listArticleDetails(this.props.match.params.id));
    this.props.dispatch(listArticleLikes(this.props.match.params.id));
    if (this.props.loggedIn) {
      this.props.dispatch(getBookmarks(this.props.user.id));
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.article !== prevProps.article) {
      this.setState({
        articleDetails: {
          title: this.props.article.title,
          body: this.props.article.body,
          user_id: this.props.article.user._id,
          user_name: this.props.article.user.name,
        },
      });
    }
  }

  onChange = (e) => {
    this.setState({
      newComment: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const newComment = {
      body: this.state.newComment,
      user: this.props.user.id,
    };
    const _id = this.props.match.params.id;
    if (this.props.loggedIn) {
      this.props.dispatch(postNewComment(_id, newComment));

      this.setState({
        newComment: "",
      });
    } else {
      alert("Log In or Register to comment.");
    }

    // window.location = "/";
  };
  handleEditComment = (comment_body, comment_id) => {
    const comment = {
      body: comment_body,
    };
    this.props.dispatch(editComment(comment_id, comment));
  };
  handleDeleteComment = (comment_id) => {
    this.props.dispatch(deleteComment(comment_id));
  };

  handleFetchComments = (e) => {
    e.preventDefault();
    if (this.state.showComments === false) {
      this.props.dispatch(listArticleComments(this.props.match.params.id));

      this.setState({ showComments: true });
    } else {
      this.setState({ showComments: false });
    }
  };

  //Edit Article & Delete
  editAndDeleArticle = () => {
    if (this.props.user.id === this.state.articleDetails.user_id) {
      return (
        <div>
          <Link to="/edit-article" className="btn btn-primary">
            Edit Article
          </Link>
          <button className="btn btn-primary" onClick={this.handleDelete}>
            Delete
          </button>
        </div>
      );
    }
    return null;
  };

  handleDelete = (e) => {
    this.props.dispatch(deleteArticle(this.props.match.params.id));
    window.location = "/";
  };
  showBookmark = () => {
    if (
      this.props.loggedIn &&
      this.props.user.id !== this.state.articleDetails.user_id
    ) {
      return <Bookmark />;
    }
  };

  render() {
    return (
      <div className="container-fluid">
        <h3>{this.state.articleDetails.title}</h3>
        <p>{this.state.articleDetails.body}</p>
        <h6>
          {" "}
          <b> Author - </b>
          <Link to={"/user/" + this.state.articleDetails.user_id}>
            {this.state.articleDetails.user_name}
          </Link>
        </h6>

        <Like />
        {this.showBookmark()}
        {this.editAndDeleArticle()}

        <hr />
        <h6>
          <a href="#" onClick={this.handleFetchComments}>
            Show Comments
          </a>
        </h6>
        {this.state.showComments ? (
          <Comments comments={this.props.comments} />
        ) : (
          ""
        )}

        <br />

        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Add Comments </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.newComment}
              onChange={this.onChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: state.authReducer.loggedIn,
    user: state.authReducer.user,
    article: state.articlesReducer.article,
    comments: state.articlesReducer.comments,
  };
}

export default connect(mapStateToProps)(ArticleView);
