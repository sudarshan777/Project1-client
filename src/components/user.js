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

  handleSubscribe = (e) => {
    e.preventDefault();
  };
  handleUnsubscribe = (e) => {
    e.preventDefault();
  };
  render() {
    return (
      <div>
        <h4>{this.state.user.name}</h4>
        <h6> Bookmarks - {this.state.user.bookmarks.length}</h6>
        <h6> Followers - {this.state.user.followers.length}</h6>
        <h6> Following - {this.state.user.following.length}</h6>

        <button className="btn btn-primary" onClick={this.handleSubscribe}>
          Subscribe
        </button>
        <button className="btn btn-primary" onClick={this.handleUnsubscribe}>
          Unsubscribe
        </button>
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
