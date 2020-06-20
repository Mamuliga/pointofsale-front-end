import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import { PAGE_ROUTES } from '../../../services/routeService';

const Dashboard = props => {
  const { push } = useHistory();
  return (
    <Fragment>
      <Divider />
      <ListItem
        onClick={e => {
          push(`${PAGE_ROUTES.home}/${e.key || 'summary'}`);
        }}
        button
      >
        <ListItemIcon>
          <MenuBookIcon />
        </ListItemIcon>
        <ListItemText>Summary</ListItemText>
      </ListItem>
      <Divider />
      <ListItem
        onClick={e => {
          push(`${PAGE_ROUTES.home}/${'dailySales'}`);
        }}
        button
      >
        <ListItemIcon>
          <MenuBookIcon />
        </ListItemIcon>
        <ListItemText>Daily Sales</ListItemText>
      </ListItem>
      <Divider />
      <ListItem
        onClick={e => {
          push(`${PAGE_ROUTES.home}/${'mostSelledItems'}`);
        }}
        button
      >
        <ListItemIcon>
          <MenuBookIcon />
        </ListItemIcon>
        <ListItemText>Most Selled Items</ListItemText>
      </ListItem>
      <Divider />
      <ListItem
        onClick={e => {
          push(`${PAGE_ROUTES.home}/${'bestCustomers'}`);
        }}
        button
      >
        <ListItemIcon>
          <MenuBookIcon />
        </ListItemIcon>
        <ListItemText>Best Customers</ListItemText>
      </ListItem>
      <Divider />
    </Fragment>
  );
};

export default Dashboard;
