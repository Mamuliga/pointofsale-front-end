import React from "react";
// import TextField from "@material-ui/core/TextField";
// import { FormGroup } from "@material-ui/core";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Paper from "@material-ui/core/Paper";
import { FormGroup } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import PersonIcon from "@material-ui/icons/Person";

const Form = () => {
  return (
    <div className="login-page-container">
      <div className="paper-width">
        <Paper className={FormGroup.Paper}>
          <Paper elevation={2} />
          <div className={FormGroup.root}>
            <AppBar position="sticky">
              {/* <IconButton
                  edge="start"
                  className={FormGroup.menuButton}
                  color="inherit"
                  aria-label="open drawer"
                >
                  <MenuIcon />
                </IconButton> */}
              <Typography className="form-header" variant="h6" noWrap>
                Customer Details
              </Typography>

              {/* <div className={FormGroup.search}>
                  <div className={FormGroup.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Search…"
                    classes={{
                      root: FormGroup.inputRoot,
                      input: FormGroup.inputInput
                    }}
                    inputProps={{ "aria-label": "search" }}
                  />
                </div> */}
            </AppBar>

            {/* <div> */}
            <div className="main-div">
              <Grid
                container
                spacing={2}
                alignItems="flex-end"
                className="person-icon"
              >
                <Grid item>
                  <PersonIcon />
                </Grid>

                <Grid item>
                  <TextField
                    className="f-name"
                    id="input-with-icon-grid"
                    xs={3}
                    label="First Name"
                    name="firstname"
                    // onChange={handleFieldChanges}
                    // value={loginCredential.password}
                  />
                </Grid>
              </Grid>

              <Grid
                container
                spacing={2}
                alignItems="flex-end"
                className="person-icon"
              >
                <Grid item>
                  <PersonIcon />
                </Grid>
                <Grid item>
                  <TextField
                    className="l-name"
                    id="input-with-icon-grid"
                    xs={3}
                    label="Last Name"
                    name="lastname"
                    // onChange={handleFieldChanges}
                    // value={loginCredential.password}
                  />
                </Grid>
              </Grid>

              <Grid item>
                <Typography className="person-gender" variant="h6" noWrap>
                  Gender
                </Typography>
              </Grid>

              <Grid item>
                <TextField
                  className="address"
                  id="input-with-icon-grid"
                  xs={3}
                  label="Address"
                  name="address"
                  // onChange={handleFieldChanges}
                  // value={loginCredential.password}
                />
              </Grid>
              <TextareaAutosize
                aria-label="empty textarea"
                placeholder="Empty"
              />

              <Grid item>
                <TextField
                  className="email"
                  id="input-with-icon-grid"
                  xs={3}
                  label="Email"
                  name="email"
                  // onChange={handleFieldChanges}
                  // value={loginCredential.password}
                />
              </Grid>
              <TextareaAutosize
                aria-label="empty textarea"
                placeholder="Empty"
              />

              <Grid item>
                <TextField
                  className="p-number"
                  id="input-with-icon-grid"
                  xs={3}
                  label="Phone Number"
                  name="phonenumber"
                  // onChange={handleFieldChanges}
                  // value={loginCredential.password}
                />
              </Grid>
              <TextareaAutosize
                aria-label="empty textarea"
                placeholder="Empty"
              />
            </div>
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default Form;
