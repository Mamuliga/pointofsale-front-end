import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { TOP_MENU_ITEMS } from '../../../services/routeService';

import useStyle from '../../../styles/useStyles';
import { LinearProgress, Tabs, Tab } from '@material-ui/core';

const SideMenu = props => {
  const { push, location } = useHistory();
  const classes = useStyle();

  let topMenuValue = 0;
  TOP_MENU_ITEMS.forEach((menu, index) => {
    if (location.pathname.includes(menu.path)) {
      topMenuValue = index;
    }
  });
  const [value, setValue] = React.useState(topMenuValue);

  return (
    <div className={classes.topMenu}>
      <Tabs
        orientation='vertical'
        value={value}
        variant='scrollable'
        scrollButtons='auto'
        onChange={(_event, newValue) => {
          const menuItem = TOP_MENU_ITEMS[newValue];
          push(menuItem.path);
          setValue(newValue);
        }}
      >
        {TOP_MENU_ITEMS.map(menuItem => (
          <Tab
            label={menuItem.title}
            icon={<menuItem.icon />}
            key={menuItem.key}
          />
        ))}
      </Tabs>
      {props.isFetching && <LinearProgress color='secondary' />}
    </div>
  );
};

const mapStateToProps = ({ global }) => {
  return { ...global };
};

export default connect(mapStateToProps)(SideMenu);
