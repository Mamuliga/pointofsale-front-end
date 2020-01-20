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
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(10),
      width: theme.spacing(50),
      height: theme.spacing(70)
    }
  }
}));

const Login = props => {
  const classes = useStyles();
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
      <div className={classes.root}>
        <Paper className={classes.Paper}>
          <Paper elevation={2} />
          {/* <h2 className="login-title">Welcome to EIT POS</h2> */}
          <Typography component="div">
            <Box
              fontFamily="Monospace"
              textAlign="center"
              fontWeight="bold"
              fontSize="h6.fontSize"
              m={6}
            >
              Welcome to EIT POS
            </Box>
          </Typography>

          <hr className="divider" />
          <div className="login-logo">
            {/* <GridListTile key={logo}>/ */}
            <img className="logo-image" src={logo} alt="logo" />
            {/* <img src={logo} alt={logo.title} /> */}
          </div>
          {/* </GridListTile> */}

          <div className={FormGroup.margin}>
            <Grid container spacing={4} alignItems="flex-end">
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
            <Grid container spacing={4} alignItems="flex-end">
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

            <div className="login-forgot-password">
              <a className="login-form-forgot" href="/forgot-password">
                Forgot password
              </a>
            </div>
          </div>
        </Paper>
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
