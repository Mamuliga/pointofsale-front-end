import React from 'react';
import { Switch, useLocation } from 'react-router-dom';
import { Drawer, Divider, List } from '@material-ui/core';
import {
  Customers,
  Employees,
  Suppliers,
  Sales,
  Receives,
  Dashboard,
  Items,
  Cashbooks,
  Settings,
} from '../../components/pages/sideMenu';
import ProtectedRoute from '../ProtectedRoute';
import { PAGE_ROUTES } from '../../services/routeService';
import useStyles from '../../styles/useStyles';
import FooterLabel from './FooterLabel';

const SideMenuRoutes = props => {
  const classes = useStyles();
  const { pathname } = useLocation();
  const isSalesPage = pathname === PAGE_ROUTES.sales;
  const isReceivesPage = pathname === PAGE_ROUTES.receives;
  const getSidePane = route => {
    if (route === PAGE_ROUTES.sales || route === PAGE_ROUTES.receives) {
      return 'right';
    }
    return 'left';
  };
  return (
    <Drawer
      variant='persistent'
      anchor={getSidePane(pathname)}
      open
      classes={{
        paper:
          classes[
            `${
              isSalesPage || isReceivesPage
                ? 'drawerPaperLeft'
                : 'drawerPaperRight'
            }`
          ],
      }}
    >
      <div className={classes.sideMenuContainer}>
        <Divider />
        <List>
          <Switch>
            <ProtectedRoute
              path={PAGE_ROUTES.customers}
              component={Customers}
            />
            <ProtectedRoute
              path={PAGE_ROUTES.suppliers}
              component={Suppliers}
            />
            <ProtectedRoute path={PAGE_ROUTES.sales} component={Sales} />
            <ProtectedRoute path={PAGE_ROUTES.receives} component={Receives} />

            <ProtectedRoute
              path={PAGE_ROUTES.employees}
              component={Employees}
            />
            <ProtectedRoute
              path={PAGE_ROUTES.cashbooks}
              component={Cashbooks}
            />
            <ProtectedRoute path={PAGE_ROUTES.settings} component={Settings} />

            <ProtectedRoute path={PAGE_ROUTES.items} component={Items} />

            <ProtectedRoute path={PAGE_ROUTES.home} component={Dashboard} />
            <ProtectedRoute component={Dashboard} authRequired />
          </Switch>
        </List>
        <FooterLabel hidden={isSalesPage || isReceivesPage} />
      </div>
    </Drawer>
  );
};
export default SideMenuRoutes;
