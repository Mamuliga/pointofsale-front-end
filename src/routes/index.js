import React from "react";
import { Switch } from "react-router-dom";
import {
  Dashboard,
  Login,
  Customers,
  Items,
  NotFoundPage
} from "../components/pages";
import ProtectedRoute from "./ProtectedRoute";
import { PAGE_ROUTES } from "../services/routeService";
import { customerRoutes, employeeRoutes, supplierRoutes } from "./routeHelper";

const Routes = props => (
  <Switch>
    <ProtectedRoute exact path={PAGE_ROUTES.home} component={Dashboard} />
    <ProtectedRoute
      exact
      path={PAGE_ROUTES.login}
      component={Login}
      authRequired={false}
    />
    {customerRoutes.map(route => (
      <ProtectedRoute
        exact
        path={route.path}
        component={route.component}
        key={route.path}
      />
    ))}
    {employeeRoutes.map(route => (
      <ProtectedRoute
        exact
        path={route.path}
        component={route.component}
        key={route.path}
      />
    ))}
    {supplierRoutes.map(route => (
      <ProtectedRoute
        exact
        path={route.path}
        component={route.component}
        key={route.path}
      />
    ))}

    <ProtectedRoute exact path={PAGE_ROUTES.sales} component={Customers} />
    <ProtectedRoute exact path={PAGE_ROUTES.items} component={Items} />
    <ProtectedRoute component={NotFoundPage} authRequired={false} />
  </Switch>
);

export default Routes;
