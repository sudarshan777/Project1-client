import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      userName: "",
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    if (nextProps.loggedIn) {
      //   state.userName = nextProps.authReducer.user.name;
      state.isLoggedIn = nextProps.loggedIn;
    }
    return null;
  }
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
          <Link to="/logout" className="nav-link">
            Logout
          </Link>
        </li>
      );
    }
    if (this.state.isLoggedIn) {
      logout = (
        <li className="navbar-item">
          <Link to={"/user/" + this.props.user.id} className="nav-link">
            {this.props.user.name}
          </Link>
        </li>
      );
    }

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/" className="navbar-brand">
          Articles
        </Link>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {createArticle}
            {register}
            {login}
            {logout}
            {user}
          </ul>
        </div>
      </nav>
    );
  }
}
function mapStateToProps(state) {
  return {
    loggedIn: state.authReducer.loggedIn,
    user: state.authReducer.user,
  };
}

export default connect(mapStateToProps)(Home);
