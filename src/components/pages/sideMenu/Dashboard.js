import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
import MenuBookIcon from '@material-ui/icons/MenuBook';

const Dashboard = props => {
  const { location, push } = useHistory();
  return (
    <Fragment>
      <Divider />
      <ListItem
        onClick={e => {
          push(`${location.pathname}/${e.key || 'summery'}`);
        }}
        button
      >
        <ListItemIcon>
          <MenuBookIcon />
        </ListItemIcon>
        <ListItemText>Summery</ListItemText>
      </ListItem>
      <Divider />
    </Fragment>
  );
};

export default Dashboard;
