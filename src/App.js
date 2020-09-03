import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setPersistentData, logout } from './store/actions/authActions';
import Routes from './routes';
import { AUTH_LOCAL_STORAGE } from './utilities/constants';
import { showTopMenuForRoute } from './services/routeService';
import SideMenu from './components/uis/SideMenu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { getUserList } from './http/usersApi';
import useStyles from './styles/useStyles';
import ErrorDisplay from './components/uis/ErrorDisplay';
import { Button } from '@material-ui/core';

function App(props) {
  const { pathname } = useLocation();
  const classes = useStyles();

  const handleLogoutClick = () => {
    if (typeof props.onLogoutPress === 'function') {
      props.onLogoutPress();
    }
  };

  const loadPersistentAuthData = () => {
    getUserList()
      .then(res => console.log('res', res))
      .catch(err => console.log('err', err));
    const persistedAuthData = localStorage.getItem(AUTH_LOCAL_STORAGE);
    props.loadAuthData(JSON.parse(persistedAuthData));
  };
  useEffect(loadPersistentAuthData, []);

  return (
    <div className={classes.mainContianer}>
      <div className={classes.header}>
        <div className={classes.logoutButtonContainer}>
          <Button
            label=''
            className={classes.logoutButton}
            onClick={handleLogoutClick}
            endIcon={<ExitToAppIcon />}
          />
        </div>
      </div>
      {showTopMenuForRoute(pathname) && (
        <SideMenu selectedKey={pathname} onLogoutPress={props.onLogoutPress} />
      )}
      <div className={classes.mainPageView}>
        <Routes {...props} />
      </div>
      <ErrorDisplay info={props.messageInfo} />
    </div>
  );
}

const mapStateToProps = ({ global }) => ({
  ...global,
});

const mapDispatchToProps = {
  loadAuthData: setPersistentData,
  onLogoutPress: logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
