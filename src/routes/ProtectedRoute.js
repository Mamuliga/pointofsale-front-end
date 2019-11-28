import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({
  component: Component,
  isAuthenticated,
  path,
  exact,
  ...rest
}) => 
  <Route
    {...rest}
    path={path}
    exact={exact}
    render={props => {
      if (isAuthenticated) {
        return <Component {...props} />;
      }
      return (
        <Redirect
          to={
            { pathname: "/customers" }
          }
          state={ from: props.location }
        />;
    }}
  />
);

export default ProtectedRoute;
