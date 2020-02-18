import React from "react";
import { Switch } from "react-router-dom";
import {
  Dashboard,
  Login,
  Customers,
  Items,
  NotFoundPage,
  FormCustomer
} from "../components/pages";
import ProtectedRoute from "./ProtectedRoute";
import { PAGE_ROUTES } from "../services/routeService";

const Routes = props => (
  <Switch>
    <ProtectedRoute exact path={PAGE_ROUTES.home} component={Dashboard} />
    <ProtectedRoute
      exact
      path={PAGE_ROUTES.login}
      component={Login}
      authRequired={false}
    />
    <ProtectedRoute exact path={PAGE_ROUTES.customers} component={Customers} />
    <ProtectedRoute
      exact
      path={`${PAGE_ROUTES.customers}/new`}
      component={FormCustomer}
    />
    <ProtectedRoute exact path={PAGE_ROUTES.suppliers} component={Customers} />
    <ProtectedRoute exact path={PAGE_ROUTES.sales} component={Customers} />
    <ProtectedRoute exact path={PAGE_ROUTES.items} component={Items} />
    <ProtectedRoute component={NotFoundPage} authRequired={false} />
  </Switch>
);

export default Routes;
