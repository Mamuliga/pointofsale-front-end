import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const Customers = props => {
  const { location, push } = useHistory();
  return (
    <Fragment>
      <Divider />
      <ListItem
        onClick={e => {
          push(`${location.pathname}/${e.key || 'new'}`);
        }}
        button
      >
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>
        <ListItemText>Create</ListItemText>
      </ListItem>
      <Divider />
    </Fragment>
  );
};

export default Customers;
