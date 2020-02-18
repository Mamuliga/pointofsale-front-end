import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import PhoneIcon from "@material-ui/icons/Phone";

const CustomPhone = ({ entry, getValue }) => {
  const { label, required, value, name } = entry;
  const [newValue, setNewValue] = useState(value);
  const handleChange = e => {
    console.log(e.target.value);
    setNewValue(e.target.value);
    if (typeof getValue === "function") {
      getValue(e);
    }
  };
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
          value={newValue}
          name={name}
          onChange={handleChange}
        />
      </Grid>
    </Grid>
  );
};

export default CustomPhone;
