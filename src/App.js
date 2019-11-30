import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setPersistentData } from "./store/actions/authActions";
import Routes from "./routes";
import { AUTH_LOCAL_STORAGE } from "./utilities/constants";

function App(props) {
  const loadPersistentAuthData = () => {
    const persistedAuthData = localStorage.getItem(AUTH_LOCAL_STORAGE);
    props.loadAuthData(JSON.parse(persistedAuthData));
  };
  useEffect(loadPersistentAuthData, []);
  return <Routes {...props} />;
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = {
  loadAuthData: setPersistentData
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
