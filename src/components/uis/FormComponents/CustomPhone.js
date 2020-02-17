import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import PhoneIcon from "@material-ui/icons/Phone";

const CustomPhone = ({ entry }) => {
  const { label, required } = entry;
  return (
    <Grid container spacing={2} alignItems='center' className='email-icon'>
      <Grid item>
        <PhoneIcon />
      </Grid>
      <Grid item>
        <TextField
          id='filled-number'
          required={required}
          label={label}
          type='number'
        />
      </Grid>
    </Grid>
  );
};

export default CustomPhone;
