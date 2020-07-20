import React, { Fragment } from 'react';
// import { useHistory } from 'react-router-dom';
import {
  ListItem,
  // ListItemIcon,
  ListItemText,
  Divider,
} from '@material-ui/core';
// import AddIcon from '@material-ui/icons/Add';
// import { PAGE_ROUTES } from '../../../services/routeService';

const Settings = props => {
  // const { push } = useHistory();
  return (
    <Fragment>
      <Divider />
      <ListItem
        // onClick={e => {
        //   push(`${PAGE_ROUTES.settings}/${e.key || 'new'}`);
        // }}
        button
      >
        <ListItemText>General</ListItemText>
      </ListItem>
      <Divider />
      <ListItem button>
        <ListItemText>User</ListItemText>
      </ListItem>
      <Divider />
    </Fragment>
  );
};

export default Settings;
