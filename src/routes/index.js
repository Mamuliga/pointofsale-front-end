import React from "react";
import { Switch } from "react-router-dom";
import { Dashboard, Login, Customers, NotFoundPage } from "../components/pages";
import ProtectedRoute from "./ProtectedRoute";

const Routes = props => (
  <div>
    <Switch>
      <ProtectedRoute exact path="/" component={Dashboard} />
      <ProtectedRoute exact path="/login" component={Login} isAuthenticated />
      <ProtectedRoute exact path="/customers" component={Customers} />
      <ProtectedRoute component={NotFoundPage} isAuthenticated />
    </Switch>
  </div>
);

export default Routes;
