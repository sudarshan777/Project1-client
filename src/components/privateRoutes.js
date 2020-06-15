import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

class PrivateRoute extends Component {
  render() {
    const { component: Component, loggedIn, ...props } = this.props;

    return (
      <Route
        {...props}
        render={(props) =>
          loggedIn ? <Component {...props} /> : <Redirect to="/" />
        }
      />
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    loggedIn: state.auth.loggedIn,
  };
};

export default connect(mapStateToProps)(PrivateRoute);
