import React from 'react';
import { Switch } from 'react-router-dom';
import {
  Dashboard,
  Login,
  Customers,
  NotFoundPage,
  Items,
  Settings,
} from '../components/pages';
import ProtectedRoute from './ProtectedRoute';
import { PAGE_ROUTES } from '../services/routeService';
import {
  customerRoutes,
  employeeRoutes,
  supplierRoutes,
  itemRoutes,
  cashbookRoutes,
  saleRoutes,
  receiveRoutes,
  settingsRoutes,
  dashboardRoutes,
} from './routeHelper';

const Routes = props => (
  <Switch>
    {dashboardRoutes.map(route => (
      <ProtectedRoute
        exact
        path={route.path}
        component={route.component}
        key={route.path}
      />
    ))}
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
        isAuthenticated={null}
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
    {itemRoutes.map(route => (
      <ProtectedRoute
        exact
        path={route.path}
        component={route.component}
        key={route.path}
      />
    ))}
    {cashbookRoutes.map(route => (
      <ProtectedRoute
        exact
        path={route.path}
        component={route.component}
        key={route.path}
      />
    ))}
    {saleRoutes.map(route => (
      <ProtectedRoute
        exact
        path={route.path}
        component={route.component}
        key={route.path}
      />
    ))}
    {receiveRoutes.map(route => (
      <ProtectedRoute
        exact
        path={route.path}
        component={route.component}
        key={route.path}
      />
    ))}
    {settingsRoutes.map(route => (
      <ProtectedRoute
        exact
        path={route.path}
        component={route.component}
        key={route.path}
      />
    ))}
    <ProtectedRoute exact path={PAGE_ROUTES.items} component={Items} />
    <ProtectedRoute exact path={PAGE_ROUTES.settings} component={Settings} />
    <ProtectedRoute component={NotFoundPage} authRequired={false} />
  </Switch>
);

export default Routes;
