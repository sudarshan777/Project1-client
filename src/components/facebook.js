import React, { Component } from "react";
import axios from "axios";

export default class facebook extends Component {
  handlefacebook = (e) => {
    axios
      .get("http://localhost:5000/authenticate/facebook/")
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    window.location = "/";
  };
  render() {
    return (
      <div>
        <button
          className="btn btn-primary"
          type="button"
          onClick={this.handlefacebook}
        >
          Facebook Login
        </button>
      </div>
    );
  }
}
