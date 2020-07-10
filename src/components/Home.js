import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../redux/actions/authActions";
import { getArticlesList } from "../redux/actions/get-list";
import ArticlesList from "./articles-list";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      userName: "",
    };
  }

  componentDidMount() {
    this.props.dispatch(getArticlesList());
  }

  static getDerivedStateFromProps(nextProps, state) {
    if (nextProps.loggedIn) {
      //   state.userName = nextProps.authReducer.user.name;
      state.isLoggedIn = nextProps.loggedIn;
    }
    return null;
  }
  handleLogout = (e) => {
    e.preventDefault();
    this.props.dispatch(logoutUser());
    window.location = "/";
  };
  render() {
    let createArticle;
    let register;
    let login;
    let logout;
    let user;

    if (this.state.isLoggedIn) {
      createArticle = (
        <li className="navbar-item">
          <Link to="/create-article" className="nav-link">
            Create Article
          </Link>
        </li>
      );
    }
    if (!this.state.isLoggedIn) {
      register = (
        <li className="navbar-item">
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </li>
      );
    }
    if (!this.state.isLoggedIn) {
      login = (
        <li className="navbar-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
      );
    }

    if (this.state.isLoggedIn) {
      logout = (
        <li className="navbar-item">
          <a className="nav-link" href="#" onClick={this.handleLogout}>
            Logout
          </a>
        </li>
      );
    }
    if (this.state.isLoggedIn) {
      user = (
        <li className="navbar-item">
          <Link to={"/user/" + this.props.user.id} className="nav-link">
            {this.props.user.name}
          </Link>
        </li>
      );
    }

    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/" className="navbar-brand">
            Articles
          </Link>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              {createArticle}
              {register}
              {login}
              {user}
              {logout}
            </ul>
          </div>
        </nav>
        {/* <div><ArticlesList articles={this.props.articles} /></div> */}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    loggedIn: state.authReducer.loggedIn,
    user: state.authReducer.user,
    articles: state.articleListReducer.articles,
  };
}

export default connect(mapStateToProps)(Home);
