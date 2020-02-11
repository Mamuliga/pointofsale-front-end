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
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  paper: {
    width: theme.spacing(50),
    height: theme.spacing(20)
  },

  button: {
    width: theme.spacing(40),
    display: "flex"
  },
  input: {
    padding: theme.spacing(2)
  },
  forget: {
    width: theme.spacing(80)
  },
  "& > *": {
    margin: theme.spacing(10),
    width: theme.spacing(80),
    height: theme.spacing(70)
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
    <React.Fragment>
      <CssBaseline />
      <Container className={classes.main} maxWidth="sm">
        <div className={classes.paper}>
          <Paper className={classes.root}>
            <Paper elevation={2} />
            <Box
              fontFamily="Monospace"
              fontSize="h5.fontSize"
              fontWeight="fontWeightBold"
              m={1}
              mx={8}
              height={40}
              width={263}
              display="inline-block"
            >
              Welcome to EIT POS
            </Box>
            <img src={logo} width="100%" height={250} alt={logo.title} />

            <div className={classes.paper}>
              <Grid
                container
                spacing={2}
                className={classes.input}
                alignItems="flex-end"
              >
                <Grid item>
                  <PersonOutlineRoundedIcon />
                </Grid>

                <Grid item>
                  <TextField
                    id="input-with-icon-grid"
                    xs={3}
                    label="username"
                    name="username"
                    onChange={handleFieldChanges}
                    value={loginCredential.username}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                spacing={2}
                className={classes.input}
                alignItems="flex-end"
              >
                <Grid item>
                  <LockOpenIcon />
                </Grid>
                <Grid item>
                  <TextField
                    id="input-with-icon-grid"
                    xs={3}
                    label="password"
                    type="password"
                    name="password"
                    onChange={handleFieldChanges}
                    value={loginCredential.password}
                  />
                </Grid>
              </Grid>
            </div>
            <Box
              display="flex"
              width={475}
              height={80}
              alignItems="center"
              justifyContent="center"
            >
              <Button
                className={classes.button}
                variant="contained"
                xs={12}
                loading={loading}
                color="primary"
                onClick={handleLoginClick}
                disableElevation
              >
                Login
              </Button>
            </Box>
            <Box
              className={classes.forget}
              display="flex"
              height={50}
              alignItems="left"
              justifyContent="center"
            >
              <Link href="/forgot-password" className={classes.link}>
                Forgot password
              </Link>
            </Box>
          </Paper>
        </div>
      </Container>
    </React.Fragment>
  );
};

const mapStateToProps = ({ auth }) => ({
  ...auth
});

const mapActionToProps = {
  onLoginClick: authenticate
};

export default connect(mapStateToProps, mapActionToProps)(Login);
