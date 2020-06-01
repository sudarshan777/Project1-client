import React, { Component } from "react";
import axios from "axios";

export default class facebook extends Component {
  handlefacebook = (e) => {
    // axios({
    //   method: "get",
    //   url: "http://localhost:5000/authenticate/facebook/",
    //   header: {
    //     "Access-Control-Allow-Origin": "*",
    //   },
    // });
    axios
      .get("http://localhost:5000/authenticate/facebook/", {
        crossdomain: true,
      })
      .then((req) => {
        console.log(req.headers);
      })
      .catch((error) => {
        console.log(error);
      });
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

// function facebook() {
//   return <a href={"http://localhost:5000/authenticate/facebook/"}>Login</a>;
// }
// export default facebook;
