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
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import GridListTile from "@material-ui/core/GridListTile";

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

  if (isAuthenticated) return <Redirect to='/' />;

  return (
    <div className='login-page-container'>
      <div className={classes.paper}>
        <Paper className={classes.Paper}>
          <Paper elevation={2} />
          <Typography component='div' className='header'>
            <Box
              fontFamily='Monospace'
              textAlign='center'
              fontWeight='bold'
              fontSize='h5.fontSize'
              m={6}
            >
              Welcome to EIT POS
            </Box>
          </Typography>

          <GridListTile key={logo} className='login-logo'>
            <img src={logo} alt={logo.title} />
          </GridListTile>

          <div className={classes.paper}>
            <Grid
              container
              spacing={2}
              alignItems='flex-end'
              className='person-icon'
            >
              <Grid item>
                <PersonOutlineRoundedIcon />
              </Grid>

              <Grid item>
                <TextField
                  className='login-input-width'
                  id='input-with-icon-grid'
                  xs={3}
                  label='username'
                  name='username'
                  onChange={handleFieldChanges}
                  value={loginCredential.username}
                />
              </Grid>
            </Grid>
            <Grid
              container
              spacing={2}
              alignItems='flex-end'
              className='lock-icon'
            >
              <Grid item>
                <LockOpenIcon />
              </Grid>
              <Grid item>
                <TextField
                  className='login-input-width'
                  id='input-with-icon-grid'
                  xs={3}
                  label='password'
                  type='password'
                  name='password'
                  onChange={handleFieldChanges}
                  value={loginCredential.password}
                />
              </Grid>
            </Grid>
          </div>
          <div className='btn-div'>
            <Button
              className='button'
              variant='contained'
              loading={loading}
              color='primary'
              onClick={handleLoginClick}
              disableElevation
            >
              Login
            </Button>
          </div>

          <div className='login-forgot-password'>
            <Link href='/forgot-password'>Forgot password</Link>
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
