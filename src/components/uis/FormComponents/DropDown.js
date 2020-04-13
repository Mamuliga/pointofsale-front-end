import React, { useState } from 'react';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import { MenuItem } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';

const DropDown = ({ entry, getValue }) => {
  const { value, name, label, required } = entry;
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
      <FormControl fullWidth>
        <InputLabel variant="outlined">{label}</InputLabel>
        <Select
          id="payment"
          name={name}
          label={label}
          value={newValue}
          onChange={handleChange}
          placeholder="payment"
          required={required}
          variant="outlined"
        >
          <MenuItem value="credit" label="credit">
            Credit
          </MenuItem>
          <MenuItem value="debit" label="debit">
            Debit
          </MenuItem>
        </Select>
      </FormControl>
    </Grid>
  );
};
export default DropDown;
