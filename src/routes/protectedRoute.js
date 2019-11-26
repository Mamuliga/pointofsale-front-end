import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({
  component: Component,
  isAuthenticated,
  path,
  exact
}) => (
  <Route
    path={path}
    exact={exact}
    render={props => {
      if (isAuthenticated) {
        return <Component />;
      } else {
        return <Redirect to={{ pathname: "/login" }} />;
      }
    }}
  />
);

export default ProtectedRoute;
