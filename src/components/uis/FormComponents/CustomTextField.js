import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

const CustomTextField = ({ entry, getValue }) => {
  const { label, name, icon, type, required, value, multiline, rows } = entry;
  const [newValue, setNewValue] = useState(value);
  const handleChange = e => {
    console.log(e.target.value);
    setNewValue(e.target.value);
    getValue && getValue(e);
  };
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
          value={newValue}
          multiline={multiline}
          rows={rows}
          onChange={handleChange}
        />
      </Grid>
    </Grid>
  );
};

export default CustomTextField;
