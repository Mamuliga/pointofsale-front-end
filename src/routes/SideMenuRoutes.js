import React from 'react';
import { Switch } from 'react-router-dom';
import { Customers, Dashboard } from '../components/pages/sideMenu';
import ProtectedRoute from './ProtectedRoute';
import { PAGE_ROUTES } from '../services/routeService';
import { Button } from '@material-ui/core';

const SideMenuRoutes = props => {
  return (
    <div className="side-menu-container">
      <Switch>
        <ProtectedRoute path={PAGE_ROUTES.customers} component={Customers} />
        <ProtectedRoute path={PAGE_ROUTES.suppliers} component={Customers} />
        <ProtectedRoute path={PAGE_ROUTES.sales} component={Customers} />
        <ProtectedRoute path={PAGE_ROUTES.home} component={Dashboard} />
        <ProtectedRoute component={Dashboard} authRequired />
      </Switch>
      <div className="side-menu-copyright">
        <p>Emerald IT</p>
        <p>Point of sale Solution</p>
        <p>All right reserved</p>
      </div>
    </div>
  );
};
export default SideMenuRoutes;
