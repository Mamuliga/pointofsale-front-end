import React, { useState, useEffect } from "react";
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
import { getEmployeeList } from "../../http/employeeApi";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { sendAuthData } from "../../http/authApi";
import ErrorDisplay from "../uis/ErrorDisplay";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  paper: {
    width: theme.spacing(50),
    height: theme.spacing(20)
  },
  paperForConfirmPwd: {
    width: theme.spacing(50),
    height: theme.spacing(30)
  },

  button: {
    width: theme.spacing(40),
    display: "flex"
  },
  input: {
    padding: theme.spacing(2)
  },
  text: {
    width: theme.spacing(36)
  },
  forget: {
    width: theme.spacing(80)
  },
  "& > *": {
    margin: theme.spacing(10),
    width: theme.spacing(80),
    height: theme.spacing(70)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

const Login = props => {
  const classes = useStyles();
  const { loading, onLoginClick, isAuthenticated } = props;

  const [password, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [allEmployees, setAllEmployess] = useState(["Admin"]);
  const [employee, setEmployee] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);

  const handleEmployeeResp = resp => {
    console.log(resp.data);
    if (resp) {
      if (Array.isArray(resp.data)) {
        setAllEmployess(resp.data.filter(emp => emp.canLogIn));
      }
    }
  };
  const handlegetEmployeeErr = err => {
    console.log(err);
  };

  useEffect(() => {
    getEmployeeList()
      .then(handleEmployeeResp)
      .catch(handlegetEmployeeErr);
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorMessage(null);
  };

  const handleChange = event => {
    setEmployee(event.target.value);
  };

  const handlePwd = e => setPwd(e.target.value);
  const handleConfirmPwd = e => setConfirmPwd(e.target.value);

  const sendAuthValidation = () => {
    if (employee.id && password) {
      if (employee.isFirstTimeLogin) {
        if (password && confirmPwd) {
          return password === confirmPwd;
        }
        setErrorMessage("Password mismatch");
        return false;
      }
      return true;
    }
    setErrorMessage("Please enter username and password");
    return false;
  };
  const handleSendAuthDataResp = resp => {
    if (resp.data !== null && typeof resp.data === "object") {
      console.log(resp.data);
      onLoginClick({ username: employee.firstName, password: resp.data.token });
    }
  };

  const handleSendAuthDataError = errResp => {
    setErrorMessage("Invalid credentials or network issue");
    console.log(errResp);
  };
  const handleLoginClick = e => {
    e.preventDefault();
    if (sendAuthValidation()) {
      sendAuthData({ employeeId: employee.id, password })
        .then(handleSendAuthDataResp)
        .catch(handleSendAuthDataError);
    }
  };

  if (isAuthenticated) return <Redirect to='/' />;

  return (
    <React.Fragment>
      <CssBaseline />
      <Container className={classes.main} maxWidth='sm'>
        <div className={classes.paper}>
          <Paper className={classes.root}>
            <Paper elevation={2} />
            <Box
              fontFamily='Monospace'
              fontSize='h5.fontSize'
              fontWeight='fontWeightBold'
              m={1}
              mx={8}
              height={40}
              width={263}
              display='inline-block'
            >
              Welcome to EIT POS
            </Box>
            <img src={logo} width='100%' height={250} alt={logo.title} />

            <div
              className={
                employee.isFirstTimeLogin
                  ? classes.paperForConfirmPwd
                  : classes.paper
              }
            >
              <Grid
                container
                spacing={2}
                className={classes.input}
                alignItems='flex-end'
              >
                <Grid item>
                  <PersonOutlineRoundedIcon />
                </Grid>
                <Grid item>
                  <FormControl className={classes.formControl}>
                    <InputLabel id='login-dropdown'>Username</InputLabel>
                    <Select
                      labelId='login-dropdown'
                      id='login-dropdown'
                      value={employee}
                      onChange={handleChange}
                    >
                      {allEmployees.map(employee => (
                        <MenuItem value={employee}>
                          {" "}
                          {employee.firstName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid
                container
                spacing={2}
                className={classes.input}
                alignItems='flex-end'
              >
                <Grid item>
                  <LockOpenIcon />
                </Grid>
                <Grid item>
                  <TextField
                    className={classes.text}
                    id='input-with-icon-grid'
                    xs={3}
                    label='password'
                    type='password'
                    name='password'
                    onChange={handlePwd}
                    value={password}
                  />
                </Grid>
              </Grid>
              {employee.isFirstTimeLogin && (
                <Grid
                  container
                  spacing={2}
                  className={classes.input}
                  alignItems='flex-end'
                >
                  <Grid item>
                    <LockOpenIcon />
                  </Grid>
                  <Grid item>
                    <TextField
                      className={classes.text}
                      id='input-with-icon-grid'
                      xs={3}
                      label='password'
                      type='password'
                      name='password'
                      onChange={handleConfirmPwd}
                      value={confirmPwd}
                    />
                  </Grid>
                </Grid>
              )}
            </div>
            <Box
              display='flex'
              width={475}
              height={80}
              alignItems='center'
              justifyContent='center'
            >
              <Button
                className={classes.button}
                variant='contained'
                xs={12}
                loading={loading}
                color='primary'
                onClick={handleLoginClick}
                disableElevation
              >
                Login
              </Button>
            </Box>
            <Box
              className={classes.forget}
              display='flex'
              height={50}
              alignItems='left'
              justifyContent='center'
            >
              <Link href='/forgot-password' className={classes.link}>
                Forgot password
              </Link>
            </Box>
          </Paper>
        </div>
      </Container>
      <ErrorDisplay handleClose={handleClose} errorMessage={errorMessage} />
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
