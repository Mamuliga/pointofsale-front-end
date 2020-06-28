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
          push(PAGE_ROUTES.home);
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
          push(PAGE_ROUTES.dailySales);
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
          push(PAGE_ROUTES.mostSelledItems);
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
          push(PAGE_ROUTES.bestSellingCustomer);
        }}
        button
      >
        <ListItemIcon>
          <MenuBookIcon />
        </ListItemIcon>
        <ListItemText>Best Customers</ListItemText>
      </ListItem>
      <Divider />
      <ListItem
        onClick={e => {
          push(PAGE_ROUTES.paymentTypeAnalytics);
        }}
        button
      >
        <ListItemIcon>
          <MenuBookIcon />
        </ListItemIcon>
        <ListItemText>Payment Type Analytics</ListItemText>
      </ListItem>
      <Divider />
      <ListItem
        onClick={e => {
          push(PAGE_ROUTES.lineGraph);
        }}
        button
      >
        <ListItemIcon>
          <MenuBookIcon />
        </ListItemIcon>
        <ListItemText>Line Graph</ListItemText>
      </ListItem>
      <Divider />
    </Fragment>
  );
};

export default Dashboard;
