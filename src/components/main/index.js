import React from "react";
import { connect } from "react-redux";
import { logout } from "../../store/actions/authActions";
import { Button } from "antd";
import { Link } from "react-router-dom";
const Main = ({ logout, authReducer, history }) => (
  <div>
    <h1>Main page</h1>
    {authReducer.isAuthenticated ? (
      <Button
        type="danger"
        onClick={() => {
          logout();
          history.push("/login");
        }}
      >
        Log out
      </Button>
    ) : (
      <Link to="/login">Login</Link>
    )}
  </div>
);

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
