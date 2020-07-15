import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Avatar, Card } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "../styles/styles.css";

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
      showFollowers: false,
      showFollowing: false,
      showArticles: false,
    };
  }

  // UNSAFE_componentWillMount() {
  //   this.props.dispatch(getUser(this.props.match.params.id));
  //   this.props.dispatch(getBookmarks(this.props.match.params.id));
  // }

  componentDidMount() {
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

        {this.props.loggedIn ? followButton : null}
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
      // <div class="container">
      //   <div class="row">
      //     <div class="col-md-offset-2 col-md-8 col-lg-offset-3 col-lg-6">
      //       <div class="well profile">
      //         <div class="col-sm-12">
      //           <div class="col-xs-12 col-sm-8">
      //             <h2>Nicole Pearson</h2>
      //             <p>
      //               <strong>About: </strong> Web Designer / UI.{" "}
      //             </p>
      //             <p>
      //               <strong>Hobbies: </strong> Read, out with friends, listen to
      //               music, draw and learn new things.{" "}
      //             </p>
      //             <p>
      //               <strong>Skills: </strong>
      //               <span class="tags">html5</span>
      //               <span class="tags">css3</span>
      //               <span class="tags">jquery</span>
      //               <span class="tags">bootstrap3</span>
      //             </p>
      //           </div>
      //           <div class="col-xs-12 col-sm-4 text-center">
      //             <figure>
      //               <img
      //                 src="http://www.localcrimenews.com/wp-content/uploads/2013/07/default-user-icon-profile.png"
      //                 alt=""
      //                 class="img-circle img-responsive"
      //               >
      //                 <figcaption class="ratings">
      //                   <p>
      //                     Ratings
      //                     <a href="#">
      //                       <span class="fa fa-star"></span>
      //                     </a>
      //                     <a href="#">
      //                       <span class="fa fa-star"></span>
      //                     </a>
      //                     <a href="#">
      //                       <span class="fa fa-star"></span>
      //                     </a>
      //                     <a href="#">
      //                       <span class="fa fa-star"></span>
      //                     </a>
      //                     <a href="#">
      //                       <span class="fa fa-star-o"></span>
      //                     </a>
      //                   </p>
      //                 </figcaption>
      //               </img>
      //             </figure>
      //           </div>
      //         </div>
      //         <div class="col-xs-12 divider text-center">
      //           <div class="col-xs-12 col-sm-4 emphasis">
      //             <h2>
      //               <strong> 20,7K </strong>
      //             </h2>
      //             <p>
      //               <small>Followers</small>
      //             </p>
      //             <button class="btn btn-success btn-block">
      //               <span class="fa fa-plus-circle"></span> Follow{" "}
      //             </button>
      //           </div>
      //           <div class="col-xs-12 col-sm-4 emphasis">
      //             <h2>
      //               <strong>245</strong>
      //             </h2>
      //             <p>
      //               <small>Following</small>
      //             </p>
      //             <button class="btn btn-info btn-block">
      //               <span class="fa fa-user"></span> View Profile{" "}
      //             </button>
      //           </div>
      //           <div class="col-xs-12 col-sm-4 emphasis">
      //             <h2>
      //               <strong>43</strong>
      //             </h2>
      //             <p>
      //               <small>Snippets</small>
      //             </p>
      //             <div class="btn-group dropup btn-block">
      //               <button type="button" class="btn btn-primary">
      //                 <span class="fa fa-gear"></span> Options{" "}
      //               </button>
      //               <button
      //                 type="button"
      //                 class="btn btn-primary dropdown-toggle"
      //                 data-toggle="dropdown"
      //               >
      //                 <span class="caret"></span>
      //                 <span class="sr-only">Toggle Dropdown</span>
      //               </button>
      //               <ul class="dropdown-menu text-left" role="menu">
      //                 <li>
      //                   <a href="#">
      //                     <span class="fa fa-envelope pull-right"></span> Send
      //                     an email{" "}
      //                   </a>
      //                 </li>
      //                 <li>
      //                   <a href="#">
      //                     <span class="fa fa-list pull-right"></span> Add or
      //                     remove from a list{" "}
      //                   </a>
      //                 </li>
      //                 <li class="divider"></li>
      //                 <li>
      //                   <a href="#">
      //                     <span class="fa fa-warning pull-right"></span>Report
      //                     this user for spam
      //                   </a>
      //                 </li>
      //                 <li class="divider"></li>
      //                 <li>
      //                   <a href="#" class="btn disabled" role="button">
      //                     {" "}
      //                     Unfollow{" "}
      //                   </a>
      //                 </li>
      //               </ul>
      //             </div>
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </div>
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
