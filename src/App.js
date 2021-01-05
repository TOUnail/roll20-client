import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Store from "./context/Store";
//import jwtDecode from "jwt-decode";
// Components
import Navbar from "./components/layout/Navbar";
// import Profile from "./components/profile/Profile";
import AuthRoute from "./util/AuthRoute";
// Pages
import Home from "./pages/home";
import Post from "./pages/post";
import User from "./pages/user";
import login from "./pages/login";
import signup from "./pages/signup";

// let authenticated;
// const token = localStorage.FBIdToken;
// if (token) {
//   const decodedToken = jwtDecode(token);
//   // console.log(decodedToken);
//   if (decodedToken.exp * 1000 < Date.now()) {
//     localStorage.removeItem("FBIdToken");
//     new Headers().delete("Authorization");
//     window.location.href = "/login";
//     authenticated = false;
//   } else {
//     authenticated = true;
//   }
// } else {
//   authenticated = false;
// }

function App() {
  return (
    <Store>
      <Router>
        <Switch>
          <AuthRoute exact path="/login" component={login} />
          <AuthRoute exact path="/signup" component={signup} />
          <Fragment>
            <Navbar />
            <div className="container">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Route exact path="/">
                  <Home />
                </Route>
                <Route
                  exact
                  path="/post/:postId"
                  render={(props) => <Post {...props} />}
                />
                <Route
                  exact
                  path="/user/:handle"
                  render={(props) => <User {...props} />}
                />
                <Route
                  exact
                  path="/user/:handle/post/:postId"
                  render={(props) => <User {...props} />}
                />
                {/*
                <div className="col-span-1 md:col-span-2 post-lists relative">
                  <Route exact path="/">
                    <Home />
                  </Route>
                  <Route
                    path="/post/:postId"
                    render={(props) => <Post {...props} />}
                  />
                  <Route
                    exact
                    path="/users/:handle"
                    render={(props) => <User {...props} />}
                  />
                </div>
                <div className="col-span-1">
                  <Profile />
                </div>
                */}
              </div>
            </div>
          </Fragment>
        </Switch>
      </Router>
    </Store>
  );
}

export default App;
