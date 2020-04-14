import React from "react";
import { Switch, useLocation } from "react-router-dom";
import { Drawer, Divider, List } from "@material-ui/core";
import {
  Customers,
  Employees,
  Suppliers,
  Sales,
  Dashboard
} from "../../components/pages/sideMenu";
import ProtectedRoute from "../ProtectedRoute";
import { PAGE_ROUTES } from "../../services/routeService";
import useStyles from "../../styles/useStyles";
const SideMenuRoutes = props => {
  const classes = useStyles();
  const { pathname } = useLocation();
  const isLeftSidePane = () => pathname === PAGE_ROUTES.sales;
  const footerBar = () => {
    if (pathname === PAGE_ROUTES.sales) {
      return (
        <div className={classes.copyrightLabel} hidden>
          <p>Emerald IT</p>
          <p>Point of sale Solution</p>
          <p>&copy; All right reserved</p>
        </div>
      );
    }
    return (
      <div className={classes.copyrightLabel}>
        <p>Emerald IT</p>
        <p>Point of sale Solution</p>
        <p>&copy; All right reserved</p>
      </div>
    );
  };
  return (
    <Drawer
      variant='persistent'
      anchor={isLeftSidePane() ? "Right" : "Left"}
      open
      classes={{
        paper:
          classes[
            `${isLeftSidePane() ? "drawerPaperRight" : "drawerPaperLeft"}`
          ]
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
            <ProtectedRoute
              path={PAGE_ROUTES.employees}
              component={Employees}
            />

            <ProtectedRoute path={PAGE_ROUTES.home} component={Dashboard} />
            <ProtectedRoute component={Dashboard} authRequired />
          </Switch>
        </List>
        {footerBar()}
      </div>
    </Drawer>
  );
};
export default SideMenuRoutes;
