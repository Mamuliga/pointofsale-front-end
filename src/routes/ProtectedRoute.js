import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({
  component: Component,
  isAuthenticated,
  path,
  exact,
  ...rest
}) => (
  <div>
    <pre>{JSON.stringify(isAuthenticated)}</pre>
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
            to={{
              pathname: "/",
              state: {
                from: props.location
              }
            }}
          />
        );
      }}
    />
  </div>
);

export default ProtectedRoute;
