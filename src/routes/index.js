import React from 'react';
import { Switch } from 'react-router-dom';
import {
  Dashboard,
  Login,
  Customers,
  Employees,
  Suppliers,
  Items,
  NotFoundPage,
  FormCustomer,
  FormEmployee,
  FormSupplier,
  FormItem
} from '../components/pages';
import ProtectedRoute from './ProtectedRoute';
import { PAGE_ROUTES } from '../services/routeService';

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
    <ProtectedRoute exact path={PAGE_ROUTES.items} component={Items} />
    <ProtectedRoute
      exact
      path={`${PAGE_ROUTES.items}/new`}
      component={FormItem}
    />
    <ProtectedRoute
      exact
      path={`${PAGE_ROUTES.employees}/new`}
      component={FormEmployee}
    />
    <ProtectedRoute
      exact
      path={`${PAGE_ROUTES.suppliers}/new`}
      component={FormSupplier}
    />
    <ProtectedRoute
      exact
      path={`${PAGE_ROUTES.customers}/edit/:id`}
      component={FormCustomer}
    />
    <ProtectedRoute
      exact
      path={`${PAGE_ROUTES.items}/edit/:id`}
      component={FormItem}
    />
    <ProtectedRoute exact path={PAGE_ROUTES.sales} component={Customers} />
    <ProtectedRoute exact path={PAGE_ROUTES.employees} component={Employees} />
    <ProtectedRoute exact path={PAGE_ROUTES.suppliers} component={Suppliers} />
    <ProtectedRoute exact path={PAGE_ROUTES.items} component={Items} />
    <ProtectedRoute component={NotFoundPage} authRequired={false} />
  </Switch>
);

export default Routes;
