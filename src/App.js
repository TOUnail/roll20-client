import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Store from "./context/Store";
//import jwtDecode from "jwt-decode";
// Components
import Navbar from "./components/Navbar";
import AuthRoute from "./util/AuthRoute";
// Pages
import Home from "./pages/home";
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
          <Route exact path="/">
            <Navbar />
            <Home />
          </Route>
          <AuthRoute exact path="/login" component={login} />
          <AuthRoute exact path="/signup" component={signup} />
        </Switch>
      </Router>
    </Store>
  );
}

export default App;
