import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Registration from "./components/registration";
import Login from "./components/login";
import Logout from "./components/logout";
import Facebook from "./components/facebook";

function App() {
  // this.state = {
  //   isLoggedIn: false,
  // };
  return (
    <Router>
      <div>
        <Route exact path="/register" component={Registration} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/facebook" component={Facebook} />
      </div>
    </Router>
  );
}

export default App;
