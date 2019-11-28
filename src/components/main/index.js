import React from "react";
import { connect } from "react-redux";
import { logout } from "../../store/actions/authActions";
import { Button } from "antd";
import { Link } from "react-router-dom";
const Main = ({ logout, authReducer, history }) => (
  <div>
    <pre>{JSON.stringify({ authReducer })}</pre>
    <h1>Main page</h1>
    <Button
      type="danger"
      onClick={() => {
        logout();
        history.push("/login");
      }}
    >
      Log out
    </Button>
    <Link to="/sales">Sales</Link>
  </div>
);

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
