import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

const CustomTextField = ({ entry }) => {
  const { label, name, icon, type, required, value, multiline, rows } = entry;
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
          multiline={multiline}
          rows={rows}
        />
      </Grid>
    </Grid>
  );
};

export default CustomTextField;
