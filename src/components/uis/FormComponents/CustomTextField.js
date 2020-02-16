import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

const CustomTextField = ({ label, name, icon, type, required }) => {
  return (
    <Grid container spacing={2} alignItems='center' className='person-icon'>
      <Grid item>{icon}</Grid>

      <Grid item>
        <TextField
          id='input-with-icon-grid'
          label={label}
          name={name}
          type={type}
          required={required}
        />
      </Grid>
    </Grid>
  );
};

export default CustomTextField;
