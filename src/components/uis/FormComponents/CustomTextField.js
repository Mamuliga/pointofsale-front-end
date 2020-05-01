import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

const CustomTextField = ({ entry, getValue }) => {
  const {
    label,
    name,
    icon,
    type,
    required,
    value,
    multiline,
    rows,
    id
  } = entry;
  const [newValue, setNewValue] = useState(value);

  const handleChange = e => {
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
        id={id}
        label={label}
        placeholder={label}
        name={name}
        type={type}
        required={required}
        value={newValue}
        multiline={multiline}
        rows={rows}
        onChange={handleChange}
        variant='outlined'
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>{icon}</InputAdornment>
          )
        }}
      />
    </Grid>
  );
};
export default CustomTextField;
