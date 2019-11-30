import React from "react";
import { Switch } from "react-router-dom";
import { Dashboard, Login, Customers, NotFoundPage } from "../components/pages";
import ProtectedRoute from "./ProtectedRoute";

const Routes = props => (
  <Switch>
    <ProtectedRoute exact path="/" component={Dashboard} />
    <ProtectedRoute
      exact
      path="/login"
      component={Login}
      authRequired={false}
    />
    <ProtectedRoute exact path="/customers" component={Customers} />
    <ProtectedRoute component={NotFoundPage} authRequired={false} />
  </Switch>
);

export default Routes;
