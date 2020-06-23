import React, { Component } from "react";
import { connect } from "react-redux";
import { getUser } from "../redux/actions/get-user";
import ArticlesList from "./articles-list";

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
      isLoggedIn: false,
      isAdmin: false,
    };
  }
  static getDerivedStateFromProps(nextProps, state) {
    // nextProps.dispatch(getUser(nextProps.match.params.id));
    if (nextProps.loggedIn) {
      state.isLoggedIn = nextProps.loggedIn;
    }
    if (nextProps.match.params.id === nextProps.user.id) {
      state.isAdmin = true;
    }
    return null;
  }
  componentDidMount() {
    console.log("IS ADMIN " + this.state.isAdmin);
    // console.log(this.props.userDetails.articlesWritten.length());
    // this.props.dispatch(getUser(this.props.match.params.id));
  }
  render() {
    const user = this.props.userDetails;
    // console.log(user.articlesWritten.length);
    let bookmarks = 0;
    let followers = 0;
    let following = 0;
    let articles = 0;
    if (this.state.isAdmin && user.bookmarks.length > 0) {
      bookmarks = user.bookmarks.length;
    }
    if (this.state.isAdmin && user.followers.length > 0) {
      followers = user.followers.length;
    }
    if (this.state.loggedIn && user.following.length > 0) {
      following = user.following.length;
    }
    if (this.state.loggedIn && user.articlesWritten.length > 0) {
      articles = user.articlesWritten.length;
    }

    return (
      <div>
        <h4>Welcome {user.name}</h4>
        <h6> Bookmarks - {bookmarks}</h6>
        <h6> Followers - {followers}</h6>
        <h6> Following - {following}</h6>
        <h6> Articles - {articles}</h6>
        <ErrorBoundary>
          <ArticlesList show={true} />
        </ErrorBoundary>
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
