import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Store from "./context/Store";
import jwtDecode from "jwt-decode";
// Components
import Navbar from "./components/Navbar";
import AuthRoute from "./util/AuthRoute";
// Pages
import Home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";

let authenticated;
const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  //console.log(decodedToken);
  if (decodedToken * 1000 < Date.now()) {
    window.location.href = "/login";
    authenticated = false;
  } else {
    authenticated = true;
  }
}

function App() {
  return (
    <Store>
      <Router>
        <Switch>
          <Route exact path="/">
            <Navbar />
            <Home />
          </Route>
          <AuthRoute
            exact
            path="/login"
            component={login}
            authenticated={authenticated}
          />
          <AuthRoute
            exact
            path="/signup"
            component={signup}
            authenticated={authenticated}
          />
        </Switch>
      </Router>
    </Store>
  );
}

export default App;
