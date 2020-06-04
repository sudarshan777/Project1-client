import React, { Component } from "react";

export default class User extends Component {
  render() {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    return (
      <div>
        <h4>Welcome {user.name}</h4>
      </div>
    );
  }
}
