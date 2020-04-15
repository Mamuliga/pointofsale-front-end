import React, { useState } from 'react';
import NativeSelect from '@material-ui/core/NativeSelect';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';

const DropDown = ({ entry, getValue }) => {
  const { value, name, required } = entry;
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
        <NativeSelect
          value={newValue}
          onChange={handleChange}
          name={name}
          required={required}
        >
          <option value="">Choose Payement Type</option>
          <option value="credit">Credit</option>
          <option value="debit">Debit</option>
        </NativeSelect>
      </FormControl>
    </Grid>
  );
};
export default DropDown;
