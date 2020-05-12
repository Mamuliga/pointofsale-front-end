import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import PrintIcon from '@material-ui/icons/Print';
import { PAGE_ROUTES } from '../../../services/routeService';

const Cashbooks = (props) => {
  const { push } = useHistory();
  return (
    <Fragment>
      <Divider />
      <ListItem
        onClick={(e) => {
          push(`${PAGE_ROUTES.cashbooks}/${e.key || 'new'}`);
        }}
        button
      >
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>
        <ListItemText>Create</ListItemText>
      </ListItem>
      <Divider />
      <ListItem
        onClick={(e) => {
          push(`${PAGE_ROUTES.cashbooks}/${e.key || 'print'}`);
        }}
        button
      >
        <ListItemIcon>
          <PrintIcon />
        </ListItemIcon>
        <ListItemText>print</ListItemText>
      </ListItem>
      <Divider />
    </Fragment>
  );
};

export default Cashbooks;
