import React from "react";
import PropType from "prop-types";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = props =>
  props.isAuthLoading ? null : (
    <>
      <Route {...props} />
    </>
  );

ProtectedRoute.propTypes = {
  isAuthLoading: PropType.bool.isRequired
};
ProtectedRoute.defaultProps = {
  isAuthLoading: true
};

export default ProtectedRoute;
