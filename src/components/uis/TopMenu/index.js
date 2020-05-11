import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { TOP_MENU_ITEMS } from '../../../services/routeService';
import LogoutIcon from '@material-ui/icons/Lock';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import useStyle from '../../../styles/useStyles';
import { LinearProgress, Tabs, Tab } from '@material-ui/core';

const TopMenu = props => {
  const { push } = useHistory();
  const classes = useStyle();

  const handleLogoutClick = e => {
    if (typeof props.onLogoutPress === 'function') {
      props.onLogoutPress();
    }
  };
  console.log(props);
  const [value, setValue] = React.useState(0);
  return (
    <div>
      <AppBar className={classes.appBar} color='primary'>
        <div
          style={{ display: 'inline-flex', justifyContent: 'space-between' }}
        >
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
            endIcon={<LogoutIcon />}
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
