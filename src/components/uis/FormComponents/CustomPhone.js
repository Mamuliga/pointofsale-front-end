import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';

const CustomPhone = ({ entry, getValue }) => {
  const { label, required, icon, value, name } = entry;
  const [newValue, setNewValue] = useState(value);

  const handleChange = (e) => {
    console.log(e.target.value);
    setNewValue(e.target.value);
    if (typeof getValue === 'function') {
      getValue(e);
    }
  };
  return (
    <Grid item xs={6}>
      <TextField
        fullWidth
        id="filled-number"
        required={required}
        label={label}
        placeholder={label}
        type="number"
        value={newValue}
        name={name}
        onChange={handleChange}
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">{icon}</InputAdornment>
          ),
        }}
      />
    </Grid>
  );
};

export default CustomPhone;
