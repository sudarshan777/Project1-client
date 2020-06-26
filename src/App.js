import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import Registration from "./components/registration";
import Login from "./components/login";
import Facebook from "./components/facebook";
import User from "./components/user";
import ArticlesList from "./components/articles-list";
import CreateArticle from "./components/create-article";
import Article from "./components/article";
import PrivateRoute from "./components/privateRoutes";
import Home from "./components/Home";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Home />
          <Switch>
            <Route
              exact
              path="/register"
              render={(props) => <Registration {...props} />}
            />
            <Route
              exact
              path="/login"
              render={(props) => <Login {...props} />}
            />

            <Route exact path="/facebook" component={Facebook} />

            <Route
              exact
              path="/"
              component={(props) => <ArticlesList show={false} {...props} />}
            />
            <Route exact path="/article/:id" component={Article} />
            <PrivateRoute
              exact
              path="/create-article"
              component={(props) => <CreateArticle {...props} />}
            />

            <Route
              exact
              path="/user/:id"
              component={(props) => <User {...props} />}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;
