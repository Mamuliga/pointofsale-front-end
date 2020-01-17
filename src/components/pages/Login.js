import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { logo } from "../../assets/images";
import { authenticate } from "../../store/actions/authActions";
import Button from "@material-ui/core/Button";
import PersonOutlineRoundedIcon from "@material-ui/icons/PersonOutlineRounded";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import Grid from "@material-ui/core/Grid";
import { FormGroup } from "@material-ui/core";

const Login = props => {
  const { loading, onLoginClick, isAuthenticated } = props;

  const [loginCredential, setLoginCredential] = useState({
    username: "",
    password: ""
  });

  const handleFieldChanges = e =>
    setLoginCredential({ ...loginCredential, [e.target.name]: e.target.value });

  const handleLoginClick = e => {
    e.preventDefault();
    onLoginClick(loginCredential);
  };

  if (isAuthenticated) return <Redirect to="/" />;

  return (
    <div className="login-page-container">
      <div className="login-form-container">
        <h2 className="login-title">Welcome to EIT POS</h2>
        <hr className="divider" />
        <div className="login-logo">
          <img className="logo-image" src={logo} alt="logo" />
        </div>

        <div className={FormGroup.margin}>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <PersonOutlineRoundedIcon />
            </Grid>
            <Grid item>
              <TextField
                id="input-with-icon-grid"
                label="username"
                name="username"
                onChange={handleFieldChanges}
                value={loginCredential.username}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <LockOpenIcon />
            </Grid>
            <Grid item>
              <TextField
                id="input-with-icon-grid"
                label="password"
                type="password"
                name="password"
                onChange={handleFieldChanges}
                value={loginCredential.password}
              />
            </Grid>
          </Grid>
          <div className="btn-div">
            <Button
              className="button"
              variant="contained"
              loading={loading}
              color="primary"
              onClick={handleLoginClick}
              disableElevation
            >
              Login
            </Button>
          </div>
        </div>

        <div className="login-forgot-password">
          <a className="login-form-forgot" href="/forgot-password">
            Forgot password
          </a>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth }) => ({
  ...auth
});

const mapActionToProps = {
  onLoginClick: authenticate
};

export default connect(mapStateToProps, mapActionToProps)(Login);
