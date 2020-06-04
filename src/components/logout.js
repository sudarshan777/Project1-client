import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Logout extends Component {
  componentDidMount() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
  render() {
    return (
      <div>
        <div className="form-group">
          <h3>Logged Out</h3>
          <p> To Continue</p>
          <Link to="/login" className="nav-link">
            <button className="btn btn-primary" type="button">
              Log In
            </button>
          </Link>
        </div>
      </div>
    );
  }
}
