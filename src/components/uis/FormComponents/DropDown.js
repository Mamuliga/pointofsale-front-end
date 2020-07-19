import React from 'react';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import {
  InputLabel,
  Select,
  Input,
  Chip,
  MenuItem,
  makeStyles,
  FormHelperText,
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
  const { value, name, id, label, helperText, error } = entry;
  const [duePayment, setDuePayment] = React.useState([]);
  const classes = useStyles();
  const theme = useTheme();
  const totalDueAmount = (amount = 0) =>
    duePayment.reduce((a, b) => a + b.amount, amount);

  function getStyles(dueId) {
    const isSelected = duePayment.filter(due => due.id === dueId);
    return {
      fontWeight: isSelected.length ? 'bold' : 'normal',
    };
  }
  const handleChange = event => {
    let arrayIndex = -1;
    duePayment.forEach((due, index) => {
      if (due.id === event.target.value.id) {
        arrayIndex = index;
      }
    });
    console.log(arrayIndex);
    if (arrayIndex < 0) {
      setDuePayment([...duePayment, event.target.value]);
      if (typeof getValue === 'function') {
        event.target.value = totalDueAmount(event.target.value.amount);
        getValue(event);
      }
    } else {
      duePayment.splice(arrayIndex, 1);
      setDuePayment([...duePayment]);
      if (typeof getValue === 'function') {
        event.target.value = totalDueAmount();
        getValue(event);
      }
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
              style={getStyles(value.id, duePayment, theme)}
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
        {error && <FormHelperText error>{helperText}</FormHelperText>}
      </FormControl>
    </Grid>
  );
};
export default Dropdown;
