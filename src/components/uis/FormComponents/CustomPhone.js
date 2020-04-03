import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  margin: {
    margin: theme.spacing(1)
  },
  textField: {
    width: '40ch'
  }
}));

const CustomPhone = ({ entry, getValue }) => {
  const { label, required, icon, value, name } = entry;
  const [newValue, setNewValue] = useState(value);
  const classes = useStyles();

  const handleChange = e => {
    console.log(e.target.value);
    setNewValue(e.target.value);
    if (typeof getValue === 'function') {
      getValue(e);
    }
  };
  return (
    <FormControl>
      <Grid item>
        <TextField
          id="filled-number"
          required={required}
          label={label}
          placeholder={label}
          type="number"
          value={newValue}
          name={name}
          onChange={handleChange}
          className={clsx(classes.margin, classes.textField)}
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">{icon}</InputAdornment>
            )
          }}
        />
      </Grid>
    </FormControl>
  );
};

export default CustomPhone;
