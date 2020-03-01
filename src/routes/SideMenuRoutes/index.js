import React from "react";
import { Switch } from "react-router-dom";
import { Drawer, Divider, List } from "@material-ui/core";
import {
  Customers,
  Employees,
  Suppliers,
  Dashboard
} from "../../components/pages/sideMenu";
import ProtectedRoute from "../ProtectedRoute";
import { PAGE_ROUTES } from "../../services/routeService";
import useStyles from "../../styles/useStyles";

const SideMenuRoutes = props => {
  const classes = useStyles();
  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open
      classes={{ paper: classes.drawerPaper }}
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
            <ProtectedRoute path={PAGE_ROUTES.sales} component={Customers} />
            <ProtectedRoute
              path={PAGE_ROUTES.employees}
              component={Employees}
            />

            <ProtectedRoute path={PAGE_ROUTES.home} component={Dashboard} />
            <ProtectedRoute component={Dashboard} authRequired />
          </Switch>
        </List>
        <div className={classes.copyrightLabel}>
          <p>Emerald IT</p>
          <p>Point of sale Solution</p>
          <p>&copy; All right reserved</p>
        </div>
      </div>
    </Drawer>
  );
};
export default SideMenuRoutes;