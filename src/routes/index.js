import React from "react";
import { Switch, Route } from "react-router-dom";
import { Dashboard, Login, Customers, NotFoundPage } from "../components/pages";
import ProtectedRoute from "./ProtectedRoute";

const Routes = props => (
  <div>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/customers" component={Customers} />
      <ProtectedRoute
        exact
        path="/customers"
        component={Customers}
        isAuthenticated={
          props.authReducer ? props.authReducer.isAuthenticated : false
        }
      />
      <Route component={NotFoundPage} />
    </Switch>
  </div>
);

export default Routes;
