import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// Components
import Navbar from "./components/Navbar";
// Pages
import Home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Navbar />
            <Home />
          </Route>
          <Route exact path="/login" component={login} />
          <Route exact path="/signup" component={signup} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
