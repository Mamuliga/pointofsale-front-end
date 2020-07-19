import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import {
  InputLabel,
  Select,
  Input,
  Chip,
  MenuItem,
  makeStyles,
} from '@material-ui/core';

import { useTheme } from '@material-ui/styles';
const Dropdown = ({ entry, getValue }) => {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const useStyles = makeStyles(theme => ({
    formControl: {
      width: '100%',
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
  }));
  const { value, name, required, id, error, multiple, label } = entry;
  const [duePayment, setDuePayment] = React.useState([]);
  const classes = useStyles();
  const theme = useTheme();

  function getStyles(name, personName, theme) {
    return {
      // fontWeight: personName.id.indexOf(name) === -1 ? 'normal' : 'bold',
    };
  }
  const handleChange = event => {
    event.target.value = event.target.value.amount;
    console.log(event.target.value.amount);
    setDuePayment([...duePayment, event.target.value]);
    if (typeof getValue === 'function') {
      getValue(event);
    }
  };

  return (
    <Grid item xs={6}>
      <FormControl className={classes.formControl}>
        <InputLabel id={label}>Due</InputLabel>
        <Select
          labelId={label}
          id={id}
          value={duePayment}
          onChange={handleChange}
          input={<Input id='Select due' />}
          name={name}
          renderValue={selected => (
            <div className={classes.chips}>
              {selected.map(due => (
                <Chip
                  key={due.id}
                  label={`Rs. ${parseFloat(due.total).toFixed(2)}`}
                  className={classes.chip}
                />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {value.map(value => (
            <MenuItem
              key={id}
              value={value}
              style={getStyles(id, duePayment, theme)}
            >
              {`pay due Rs. ${parseFloat(value.amount).toFixed(
                2
              )} on ${new Date(value.createdAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
              })}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
};
export default Dropdown;
