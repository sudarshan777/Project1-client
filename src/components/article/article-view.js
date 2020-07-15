import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  postNewComment,
  listArticleDetails,
  bookmarkArticle,
  removeBookmarkArticle,
  deleteArticle,
} from "../../redux/actions/articlesActions";

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
    };
  }
  componentDidMount() {
    this.props.dispatch(listArticleDetails(this.props.match.params.id));
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
        isBookmarked: false,
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
    // if (this.state.articleDetails.comments.length > 0) {
    //   return (
    //     <div>
    //       <h6>
    //         {" "}
    //         <b>Comments</b>
    //       </h6>

    //       <ul className="list-group">
    //         {this.state.articleDetails.comments.map((comment, index) => {
    //           return (
    //             <li className="list-group-item" key={index}>
    //               {comment.body} by {/*comment.user.name*/}
    //             </li>
    //           );
    //         })}
    //       </ul>
    //     </div>
    //   );
    // }
    return null;
  };
  deleteArticle = () => {
    if (this.props.user.id === this.state.articleDetails.user_id) {
      return (
        <button className="btn btn-primary" onClick={this.handleDelete}>
          Delete
        </button>
      );
    }
    return null;
  };

  handleDelete = (e) => {
    this.props.dispatch(deleteArticle(this.props.match.params.id));
    window.location = "/";
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

        {this.deleteArticle()}
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

export default connect(mapStateToProps)(ArticleView);
