import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setPersistentData, logout } from './store/actions/authActions';
import Routes from './routes';
import { AUTH_LOCAL_STORAGE } from './utilities/constants';
import TopMenu from './components/uis/TopMenu';
import {
  showTopMenuForRoute,
  showSideMenuForRoute,
  PAGE_ROUTES,
} from './services/routeService';
import SideMenuRoutes from './routes/SideMenuRoutes';
import { getUserList } from './http/usersApi';
import useStyles from './styles/useStyles';
import ErrorDisplay from './components/uis/ErrorDisplay';

function App(props) {
  const { pathname } = useLocation();
  const classes = useStyles();

  const loadPersistentAuthData = () => {
    getUserList()
      .then(res => console.log('res', res))
      .catch(err => console.log('err', err));
    const persistedAuthData = localStorage.getItem(AUTH_LOCAL_STORAGE);
    props.loadAuthData(JSON.parse(persistedAuthData));
  };
  useEffect(loadPersistentAuthData, []);
  let sideBar = classes.mainRouteViewLeftSidebar;
  if (
    pathname === PAGE_ROUTES.sales ||
    pathname === PAGE_ROUTES.receives ||
    pathname === PAGE_ROUTES.creditbooks
  ) {
    sideBar = classes.mainRouteViewRightSidebar;
  }

  return (
    <div className='App'>
      {showTopMenuForRoute(pathname) && (
        <TopMenu selectedKey={pathname} onLogoutPress={props.onLogoutPress} />
      )}
      <div>
        {showSideMenuForRoute(pathname) && <SideMenuRoutes />}
        <div className={sideBar}>
          <Routes {...props} />
        </div>
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
