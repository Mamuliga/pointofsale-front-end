import React from 'react';
import { Switch } from 'react-router-dom';
import {
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
import { Create } from '@material-ui/icons';
import { Customers, Dashboard } from '../../components/pages/sideMenu';
import ProtectedRoute from '../ProtectedRoute';
import { PAGE_ROUTES } from '../../services/routeService';
import useStyle from './useStyle';

const SideMenuRoutes = props => {
  const classes = useStyle();
  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open
      classes={{ paper: classes.drawerPaper }}
    >
      <Divider />
      <List>
        <Divider />
        <ListItem button>
          <ListItemIcon>
            <Create />
          </ListItemIcon>
          <ListItemText>Create</ListItemText>
        </ListItem>
        <Divider />
      </List>
      <Divider />
      {/* <Switch>
        <ProtectedRoute path={PAGE_ROUTES.customers} component={Customers} />
        <ProtectedRoute path={PAGE_ROUTES.suppliers} component={Customers} />
        <ProtectedRoute path={PAGE_ROUTES.sales} component={Customers} />
        <ProtectedRoute path={PAGE_ROUTES.home} component={Dashboard} />
        <ProtectedRoute component={Dashboard} authRequired />
      </Switch> */}
      {/* <div className="side-menu-copyright">
        <p>Emerald IT</p>
        <p>Point of sale Solution</p>
        <p>All right reserved</p>
      </div> */}
    </Drawer>
  );
};
export default SideMenuRoutes;
