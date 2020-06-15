import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { signupUser } from "../redux/actions/authActions";
import { connect } from "react-redux";

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  static getDerivedStateFromProps(props, state) {
    if (props.isLoggedIn) {
      console.log(props);
      props.history.push("/article-list");
    }
    return null;
  }

  onSubmit = (e) => {
    e.preventDefault();

    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    };

    this.props.dispatch(signupUser(user));

    this.setState({
      name: "",
      email: "",
      password: "",
    });
    // window.location = "/";
  };

  render() {
    return (
      <div>
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name: </label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={this.state.name}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email: </label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={this.state.email}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password: </label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Create User"
              className="btn btn-primary"
            />
          </div>
        </form>

        <Link to="/facebook" className="nav-link">
          <button className="btn btn-primary" type="button">
            Facebook
          </button>
        </Link>
      </div>
    );
  }
}

Registration.propTypes = {};

const mapStateToProps = (state) => {
  console.log("Signup" + JSON.stringify(state));
  return {
    userObject: state.authReducer.user,
    isLoggedIn: state.authReducer.loggedIn,
  };
};

export default connect(mapStateToProps)(Registration);
