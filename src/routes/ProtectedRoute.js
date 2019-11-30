import React from "react";
import PropType from "prop-types";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = props => {
  return props.isAuthLoading ? null : props.isAuthenticated ? (
    <Route {...props} />
  ) : (
    <Redirect to="/login" />
  );
};

ProtectedRoute.propTypes = {
  isAuthLoading: PropType.bool.isRequired,
  isAuthenticated: PropType.bool.isRequired
};
ProtectedRoute.defaultProps = {
  isAuthLoading: false,
  isAuthenticated: false
};

export default ProtectedRoute;
