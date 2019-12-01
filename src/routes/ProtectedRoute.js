import React from "react";
import { connect } from "react-redux";
import PropType from "prop-types";
import { Route, Redirect } from "react-router-dom";
import Loading from "../components/uis/Loading";

const ProtectedRoute = props => {
  if (!props.authRequired) return <Route {...props} />;
  return props.isAuthenticated === null ? (
    <Loading />
  ) : props.isAuthenticated ? (
    <Route {...props} />
  ) : (
    <Redirect to="/login" />
  );
};

ProtectedRoute.propTypes = {
  loading: PropType.bool,
  isAuthenticated: PropType.bool,
  authRequired: PropType.bool
};
ProtectedRoute.defaultProps = {
  loading: false,
  isAuthenticated: false,
  authRequired: true
};

const mapStateToProps = ({ auth }) => ({
  ...auth
});

export default connect(mapStateToProps)(ProtectedRoute);
