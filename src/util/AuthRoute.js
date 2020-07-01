import React from "react";
import { Route, Redirect } from "react-router-dom";
import Context from "../context/Context";

const AuthRoute = ({ component: Component, authenticated, ...rest }) => (
  <Context.Consumer>
    {(context) => (
      <Route
        {...rest}
        render={(props) =>
          context.authenticated === true ? (
            <Redirect to="/" />
          ) : (
            <Component {...props} />
          )
        }
      />
    )}
  </Context.Consumer>
);

export default AuthRoute;
