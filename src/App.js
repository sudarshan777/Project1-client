import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import decode from "jwt-decode";
import "bootstrap/dist/css/bootstrap.min.css";

import Registration from "./components/registration";
import Login from "./components/login";
import Logout from "./components/logout";
import Facebook from "./components/facebook";
import User from "./components/user";
import ArticlesList from "./components/articles-list";
import CreateArticle from "./components/create-article";
import Article from "./components/articles";
import PrivateRoute from "./components/privateRoutes";

// const checkAuth = () => {
//   const token = localStorage.getItem("token");
//   if (!token) return false;

//   try {
//     const { exp } = decode(token);
//     if (exp < new Date().getTime() / 1000) {
//       return false;
//     }
//   } catch (e) {
//     return false;
//   }

//   return true;
// };
// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route
//     {...rest}
//     render={(props) =>
//       checkAuth() ? (
//         <Component {...props} />
//       ) : (
//         <Redirect to={{ pathname: "/login" }} />
//       )
//     }
//   />
// );

function App() {
  // this.state = {
  //   isLoggedIn: false,
  // };
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/register"
          render={(props) => <Registration {...props} />}
        />
        <Route exact path="/login" render={(props) => <Login {...props} />} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/facebook" component={Facebook} />
        <Route exact path="/article-list" component={ArticlesList} />
        <Route exact path="/article/:id" component={Article} />
        <PrivateRoute
          exact
          path="/create-article"
          component={(props) => <CreateArticle {...props} />}
        />

        <PrivateRoute
          exact
          path="/user"
          component={(props) => <User {...props} />}
        />
      </Switch>
    </Router>
  );
}

export default App;
