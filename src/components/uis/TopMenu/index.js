import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { TOP_MENU_ITEMS } from '../../../services/routeService';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import useStyle from '../../../styles/useStyles';
import { LinearProgress, Tabs, Tab } from '@material-ui/core';

const TopMenu = props => {
  const { push, location } = useHistory();
  const classes = useStyle();

  const handleLogoutClick = e => {
    if (typeof props.onLogoutPress === 'function') {
      props.onLogoutPress();
    }
  };
  let topMenuValue = 0;
  TOP_MENU_ITEMS.forEach((menu, index) => {
    if (menu.path === location.pathname) {
      topMenuValue = index;
    }
  });
  const [value, setValue] = React.useState(topMenuValue);
  return (
    <div>
      <AppBar className={classes.appBar} color='primary'>
        <div className={classes.topMenu}>
          <Tabs
            value={value}
            onChange={(event, newValue) => {
              const menuItem = TOP_MENU_ITEMS[newValue];
              push(menuItem.path);
              setValue(newValue);
            }}
          >
            {TOP_MENU_ITEMS.map(menuItem => (
              <Tab
                label={menuItem.title}
                key={menuItem.key}
                icon={<menuItem.icon />}
              />
            ))}
          </Tabs>
          <Button
            label=''
            className={classes.logoutButton}
            onClick={handleLogoutClick}
            endIcon={<ExitToAppIcon />}
          />
        </div>
        {props.isFetching && <LinearProgress color='secondary' />}
      </AppBar>
    </div>
  );
};

const mapStateToProps = ({ global }) => {
  return { ...global };
};

export default connect(mapStateToProps)(TopMenu);
