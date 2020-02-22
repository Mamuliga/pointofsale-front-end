import React from "react";
import { FormGroup } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import PersonIcon from "@material-ui/icons/Person";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import HomeIcon from "@material-ui/icons/Home";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";

const Form = () => {
  return (
    <div className="login-page-container">
      <div className={FormGroup.root}>
        <div className="main-div">
          <Grid>
            <Typography className="form-header" variant="h6" noWrap>
              Customer Details
            </Typography>
          </Grid>

          <div className="fname-div">
            <Grid
              container
              spacing={2}
              alignItems="center"
              className="person-icon"
            >
              <Grid item>
                <PersonIcon />
              </Grid>

              <Grid item>
                <TextField
                  className="f-name"
                  id="input-with-icon-grid"
                  label="First Name"
                  name="firstname"
                />
              </Grid>
            </Grid>
          </div>
          <div className="lname-div">
            <Grid
              container
              spacing={2}
              alignItems="center"
              className="person-icon"
            >
              <Grid item>
                <PersonIcon />
              </Grid>
              <Grid item>
                <TextField
                  className="l-name"
                  id="input-with-icon-grid"
                  label="Last Name"
                  name="lastname"
                />
              </Grid>
            </Grid>
          </div>
          <Grid item>
            <Typography
              className="person-gender"
              alignItems="center"
              variant="h6"
              noWrap
            >
              Gender
            </Typography>
          </Grid>
          <div className="male-check">
            <FormControlLabel
              control={<Checkbox value="checkedB" color="primary" />}
              label="Male"
            />

            <FormControlLabel
              control={<Checkbox value="checkedB" color="primary" />}
              label="Female"
            />
          </div>
          <div className="address-div">
            <Grid
              container
              spacing={2}
              alignItems="center"
              className="home-icon"
            >
              <Grid item>
                <HomeIcon />
              </Grid>
              <Grid item>
                <TextField
                  className="address"
                  id="input-with-icon-grid"
                  label="Address"
                  name="address"
                />
              </Grid>
            </Grid>
          </div>
          <div className="email-div">
            <Grid
              container
              spacing={2}
              alignItems="center"
              className="email-icon"
            >
              <Grid item>
                <EmailIcon />
              </Grid>
              <Grid item>
                <TextField
                  className="email"
                  id="input-with-icon-grid"
                  label="Email"
                  name="email"
                />
              </Grid>
            </Grid>
          </div>
          <div className="pnumber-div">
            <Grid
              container
              spacing={2}
              alignItems="center"
              className="email-icon"
            >
              <Grid item>
                <PhoneIcon />
              </Grid>
              <Grid item>
                <TextField
                  className="p-number"
                  id="input-with-icon-grid"
                  label="Phone Number"
                  name="phonenumber"
                />
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
