import React from "react";
import { connect } from "react-redux";
import { authenticate, logout } from "../../store/actions/authActions";
import { Button } from "antd";

const Login = ({ authReducer, authenticate, logout, history }) => (
  <div>
    <h1>This is Login page</h1>
    <pre>{JSON.stringify(authReducer)}</pre>
    <h2>Click here to login/logut</h2>
    <Button
      type="primary"
      onClick={() => {
        if (authReducer && authReducer.isAuthenticated) {
          logout();
        } else {
          authenticate();
          history.push("./sales");
        }
      }}
    >
      {authReducer && authReducer.isAuthenticated ? "Log out" : "Log in"}
    </Button>
  </div>
);

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  authenticate: () => dispatch(authenticate()),
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
