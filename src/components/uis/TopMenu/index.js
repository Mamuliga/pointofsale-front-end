import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { TOP_MENU_ITEMS } from '../../../services/routeService';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import useStyle from '../../../styles/useStyles';
import { LinearProgress } from '@material-ui/core';

const TopMenu = props => {
  const { push } = useHistory();
  const classes = useStyle();

  const handleMenuClick = menuItem => {
    const menuClick = () => {
      push(menuItem.path);
    };
    return menuClick;
  };

  const handleLogoutClick = e => {
    if (typeof props.onLogoutPress === 'function') {
      props.onLogoutPress();
    }
  };
  console.log(props);

  return (
    <AppBar className={classes.appBar} color='primary'>
      <Toolbar>
        <Typography className={classes.leftMenubar}>
          {TOP_MENU_ITEMS.map(menuItem => (
            <Typography key={menuItem.key} className={classes.navButton}>
              <Button
                className={classes.innerButton}
                color='inherit'
                startIcon={<menuItem.icon />}
                onClick={handleMenuClick(menuItem)}
              >
                {menuItem.title}
              </Button>
            </Typography>
          ))}
        </Typography>
        <Typography className={classes.navButton}>
          <Button
            className={classes.innerButton}
            color='inherit'
            startIcon={<ExitToAppIcon />}
            onClick={handleLogoutClick}
          >
            Logout
          </Button>
        </Typography>
      </Toolbar>
      {props.isFetching && <LinearProgress color='secondary' />}
    </AppBar>
  );
};

const mapStateToProps = ({ global }) => {
  return { ...global };
};

export default connect(mapStateToProps)(TopMenu);
