import React, { Component } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import {
  getUser,
  followUser,
  unFollowUser,
  getBookmarks,
  getFollowers,
  getFollowing,
  getUserWrittenArticles,
} from "../redux/actions/get-user";
import ArticlesList from "./article/articles-list";

class ErrorBoundary extends Component {
  state = { errorMessage: null };

  static getDerivedStateFromError(error) {
    return { errorMessage: error.message };
  }

  componentDidCatch(error, info) {
    console.log(error, info);
  }

  render() {
    if (this.state.errorMessage) {
      return <h1>Oops! {this.state.errorMessage}</h1>;
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
      showFollowers: false,
      showFollowing: false,
      showArticles: false,
    };
  }

  componentDidMount() {
    this.props.dispatch(getUser(this.props.match.params.id));
    this.props.dispatch(getBookmarks(this.props.match.params.id));
  }
  componentDidUpdate(prevProps) {
    if (this.props.userDetails !== prevProps.userDetails) {
      console.log(this.props.user);
      this.setState({
        user: {
          role: this.props.userDetails.role,
          bookmarks: this.props.userDetails.bookmarks,
          articleLiked: this.props.userDetails.articleLiked,
          following: this.props.userDetails.following,
          followers: this.props.userDetails.followers,
          _id: this.props.userDetails._id,
          name: this.props.userDetails.name,
          commented: this.props.userDetails.commented,
        },
      });
    }
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
  handleClickFollowers = (e) => {
    e.preventDefault();
    if (this.state.user.followers.length === 0) {
      return false;
    }
    this.props.dispatch(getFollowers(this.props.match.params.id));
    this.setState({
      showFollowers: true,
      showFollowing: false,
      showArticles: false,
    });
  };

  handleClickFollowing = (e) => {
    e.preventDefault();
    if (this.state.user.following.length === 0) {
      return false;
    }
    this.props.dispatch(getFollowing(this.props.match.params.id));
    this.setState({
      showFollowing: true,
      showFollowers: false,
      showArticles: false,
    });
  };

  handleClickArticlesWritten = (e) => {
    e.preventDefault();
    this.props.dispatch(getUserWrittenArticles(this.props.match.params.id));
    this.setState({
      showArticles: true,
      showFollowing: false,
      showFollowers: false,
    });
  };

  followButton = () => {
    return (
      <div>
        <button className="btn btn-primary" onClick={this.handleFollow}>
          Follow
        </button>
        <button className="btn btn-primary" onClick={this.handleUnfollow}>
          Un Follow
        </button>
      </div>
    );
  };

  render() {
    return (
      <div>
        <h4>{this.state.user.name}</h4>
        <h6>
          <a href="#" onClick={this.handleClickArticlesWritten}>
            Articles Written
          </a>
        </h6>
        <h6> Bookmarks - {this.state.user.bookmarks.length}</h6>
        <h6>
          <a href="#" onClick={this.handleClickFollowers}>
            Followers
          </a>
          - {this.state.user.followers.length}
        </h6>
        <h6>
          <a href="#" onClick={this.handleClickFollowing}>
            Following
          </a>
          - {this.state.user.following.length}
        </h6>

        {this.props.loggedIn ? this.followButton() : null}

        <ErrorBoundary>
          <ArticlesList article={null} />
        </ErrorBoundary>
        <div>
          {this.state.showFollowers && this.props.followers.length !== 0 ? (
            <div>
              <h5>Followers</h5>
              <ul>
                {this.props.followers.map((user) => {
                  return (
                    <li key={user._id}>
                      <Link to={"/user/" + user._id}>{user.name}</Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}
        </div>

        <div>
          {this.state.showFollowing && this.props.following.length !== 0 ? (
            <div>
              <h5>Following</h5>
              <ul>
                {this.props.following.map((user) => {
                  return (
                    <li key={user._id}>
                      <Link to={"/user/" + user._id}>{user.name}</Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}
        </div>

        <div>
          {this.state.showArticles && this.props.articles.length !== 0 ? (
            <div>
              <h5>Articles Written</h5>
              <ArticlesList articles={this.props.articles} />
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log("User" + JSON.stringify(state.userReducer.user));
  console.log("Followers" + JSON.stringify(state.userReducer.followers));
  console.log("Following" + JSON.stringify(state.userReducer.following));
  console.log("Articles" + JSON.stringify(state.userReducer.articles));

  return {
    loggedIn: state.authReducer.loggedIn,
    user: state.authReducer.user,
    userDetails: state.userReducer.user,
    followers: state.userReducer.followers,
    following: state.userReducer.following,
    articles: state.userReducer.articles,
  };
}

export default connect(mapStateToProps)(User);
