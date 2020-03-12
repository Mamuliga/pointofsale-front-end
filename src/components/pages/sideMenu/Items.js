import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { PAGE_ROUTES } from '../../../services/routeService';

const Items = props => {
  const { push } = useHistory();
  return (
    <Fragment>
      <Divider />
      <ListItem
        onClick={e => {
          push(`${PAGE_ROUTES.items}/${e.key || 'new'}`);
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

export default Items;
