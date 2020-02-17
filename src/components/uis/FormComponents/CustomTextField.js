import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

const CustomTextField = ({ label, name, icon, type, required, value }) => {
  return (
    <Grid container spacing={2} alignItems='center' className='person-icon'>
      <Grid item>{icon}</Grid>

      <Grid item>
        <TextField
          id={name}
          label={label}
          name={name}
          type={type}
          required={required}
          value={value}
        />
      </Grid>
    </Grid>
  );
};

export default CustomTextField;
