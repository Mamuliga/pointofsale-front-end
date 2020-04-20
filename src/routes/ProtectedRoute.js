import React from "react";
import { connect } from "react-redux";
import PropType from "prop-types";
import { Route, Redirect, useLocation } from "react-router-dom";
import Loading from "../components/uis/Loading";
import { PAGE_ROUTES } from "../services/routeService";

const ProtectedRoute = props => {
  const { pathname } = useLocation();
  if (pathname === "/") return <Redirect to={PAGE_ROUTES.home} />;
  if (!props.authRequired) return <Route {...props} />;
  return props.isAuthenticated === null ? (
    <Loading />
  ) : props.isAuthenticated ? (
    <Route {...props} />
  ) : (
    <Redirect to={PAGE_ROUTES.login} />
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
