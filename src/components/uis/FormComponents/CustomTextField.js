import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
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

const CustomTextField = ({ entry, getValue }) => {
  const { label, name, icon, type, required, value, multiline, rows } = entry;
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
          id={name}
          label={label}
          placeholder={label}
          name={name}
          type={type}
          required={required}
          value={newValue}
          multiline={multiline}
          rows={rows}
          onChange={handleChange}
          variant="outlined"
          className={clsx(classes.margin, classes.textField)}
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
export default CustomTextField;
