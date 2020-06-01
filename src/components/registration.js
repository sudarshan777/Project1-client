import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Registration extends Component {
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

  onSubmit = (e) => {
    e.preventDefault();

    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    };

    axios
      .post(
        "http://localhost:5000/signup",

        user
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    this.setState({
      name: "",
      email: "",
      password: "",
    });
    window.location = "/";
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
