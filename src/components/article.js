import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  postNewComment,
  listArticleDetails,
  bookmarkArticle,
  removeBookmarkArticle,
} from "../redux/actions/articlesActions";

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articleDetails: {
        title: "",
        body: "",
        user_id: "",
        user_name: "",
        comments: [],
      },
      newComment: "",
    };
  }
  UNSAFE_componentWillMount() {
    this.props.dispatch(listArticleDetails(this.props.match.params.id));
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      articleDetails: {
        title: nextProps.article.title,
        body: nextProps.article.body,
        user_id: nextProps.article.user._id,
        user_name: nextProps.article.user.name,
        comments: nextProps.article.comments,
      },
      isBookmarked: false,
    });
    console.log(this.state.articleDetails);
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

    console.log(this.props.user.id);
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
  handlebookmark = (e) => {
    if (this.props.loggedIn) {
      this.props.dispatch(
        bookmarkArticle(this.props.match.params.id, this.props.user.id)
      );
    } else {
      e.preventDefault();
      alert("Log In or Register to bookmark.");
    }
  };
  handleRemovebookmark = (e) => {
    if (this.props.loggedIn) {
      this.props.dispatch(
        removeBookmarkArticle(this.props.match.params.id, this.props.user.id)
      );
    } else {
      e.preventDefault();
      alert("Log In or Register to remove bookmark.");
    }
  };

  commentsList = () => {
    if (this.state.articleDetails.comments.length > 0) {
      return (
        <div>
          <h6>
            {" "}
            <b>Comments</b>
          </h6>

          <ul className="list-group">
            {this.state.articleDetails.comments.map((comment, index) => {
              return (
                <li className="list-group-item" key={index}>
                  {comment.body} by {/*comment.user.name*/}
                </li>
              );
            })}
          </ul>
        </div>
      );
    }
    return null;
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

        <button className="btn btn-primary" onClick={this.handlebookmark}>
          Bookmark
        </button>
        <button className="btn btn-primary" onClick={this.handleRemovebookmark}>
          Remove Bookmark
        </button>

        <hr />

        {this.commentsList()}

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
  };
}

export default connect(mapStateToProps)(Article);
