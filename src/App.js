import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import decode from "jwt-decode";
import "bootstrap/dist/css/bootstrap.min.css";

import Registration from "./components/registration";
import Login from "./components/login";
import Logout from "./components/logout";
import Facebook from "./components/facebook";
import User from "./components/user";
import ArticlesList from "./components/articles-list";
import CreateArticle from "./components/create-article";

const checkAuth = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const { exp } = decode(token);
    if (exp < new Date().getTime() / 1000) {
      return false;
    }
  } catch (e) {
    return false;
  }

  return true;
};
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      checkAuth() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/login" }} />
      )
    }
  />
);

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
        <Route exact path="/article-list" component={ArticlesList} />
        <PrivateRoute exact path="/create-article" component={CreateArticle} />
        <PrivateRoute exact path="/user" component={User} />
      </div>
    </Router>
  );
}

export default App;
