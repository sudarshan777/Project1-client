import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getUser,
  followUser,
  unFollowUser,
  getBookmarks,
} from "../redux/actions/get-user";
import ArticlesList from "./articles-list";

class ErrorBoundary extends Component {
  state = {
    errorMessage: null,
  };

  static getDerivedStateFromError(error) {
    return {
      errorMessage: error.message,
    };
  }

  componentDidCatch(error, info) {
    console.log(error, info);
  }

  render() {
    if (this.state.errorMessage) {
      return <h1> Oops!{this.state.errorMessage} </h1>;
    }

    return this.props.children;
  }
}

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        role: [],
        articlesWritten: [],
        bookmarks: [],
        articleLiked: [],
        following: [],
        followers: [],
        _id: "",
        name: "",
        email: "",
        commented: [],
      },
    };
  }

  UNSAFE_componentWillMount() {
    this.props.dispatch(getUser(this.props.match.params.id));
    this.props.dispatch(getBookmarks(this.props.match.params.id));
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      user: {
        role: nextProps.userDetails.role,
        bookmarks: nextProps.userDetails.bookmarks,
        articleLiked: nextProps.userDetails.articleLiked,
        following: nextProps.userDetails.following,
        followers: nextProps.userDetails.followers,
        _id: nextProps.userDetails._id,
        name: nextProps.userDetails.name,
        commented: nextProps.userDetails.commented,
      },
    });
    console.log(this.state.user);
  }

  handleFollow = (e) => {
    if (this.props.loggedIn && this.props.user.id !== this.state.user._id) {
      this.props.dispatch(followUser(this.props.user.id, this.state.user._id));
    } else if (
      this.props.loggedIn &&
      this.props.user.id === this.state.user._id
    ) {
      alert("You cannot follow yourself.");
    } else {
      e.preventDefault();
      alert("Log In or Register to follow.");
    }
  };
  handleUnfollow = (e) => {
    if (this.props.loggedIn && this.props.user.id !== this.state.user._id) {
      this.props.dispatch(
        unFollowUser(this.props.user.id, this.state.user._id)
      );
    } else if (
      this.props.loggedIn &&
      this.props.user.id === this.state.user._id
    ) {
      alert("You cannot un follow yourself.");
    } else {
      e.preventDefault();
      alert("Log In or Register to Unfollow.");
    }
  };

  render() {
    let followButton = (
      <div>
        <button className="btn btn-primary" onClick={this.handleFollow}>
          Follow{" "}
        </button>{" "}
        <button className="btn btn-primary" onClick={this.handleUnfollow}>
          Un Follow{" "}
        </button>{" "}
      </div>
    );
    return (
      <div>
        <center>
          {" "}
          <h1> {this.state.user.name} </h1>
        </center>
        <h6> Bookmarks - {this.state.user.bookmarks.length} </h6>{" "}
        <h6> Followers - {this.state.user.followers.length} </h6>{" "}
        <h6> Following - {this.state.user.following.length} </h6>{" "}
        {this.props.loggedIn ? followButton : null}
        <ErrorBoundary>
          <ArticlesList />
        </ErrorBoundary>{" "}
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log("User" + JSON.stringify(state.userReducer.user));
  return {
    loggedIn: state.authReducer.loggedIn,
    user: state.authReducer.user,
    userDetails: state.userReducer.user,
  };
}

export default connect(mapStateToProps)(User);
