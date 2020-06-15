import React, { Component } from "react";
import { connect } from "react-redux";
class User extends Component {
  render() {
    const user = this.props.user;
    console.log(user);
    return (
      <div>
        <h4>
          Welcome {user.name} {user.id}
        </h4>
      </div>
    );
  }
}
function mapStateToProps(state) {
  console.log("User" + JSON.stringify(state.authReducer.user));
  return {
    user: state.authReducer.user,
  };
}

export default connect(mapStateToProps)(User);
