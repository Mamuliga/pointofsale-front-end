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
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
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
  const {
    value,
    name,
    required,
    id,
    helperText,
    error,
    multiple,
    label,
  } = entry;
  const [newValue, setNewValue] = useState(value);
  const [personName, setPersonName] = React.useState([]);
  const classes = useStyles();
  const theme = useTheme();
  const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
  ];

  function getStyles(name, personName, theme) {
    return {
      // fontWeight: personName.id.indexOf(name) === -1 ? 'normal' : 'bold',
    };
  }
  const handleChange = event => {
    setPersonName(event.target.value);
  };

  return (
    <Grid item xs={6}>
      <FormControl className={classes.formControl}>
        <InputLabel id={label}>Due</InputLabel>
        <Select
          labelId={label}
          id={id}
          value={personName}
          onChange={handleChange}
          input={<Input id='Select due' />}
          renderValue={selected => (
            <div className={classes.chips}>
              {selected.map(amount => (
                <Chip key={amount} label={amount} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {newValue.map(({ id, amount }) => (
            <MenuItem
              key={id}
              value={[]}
              style={getStyles(id, personName, theme)}
            >
              {`Id is ${id} - Amount is ${amount}`}
            </MenuItem>
          ))}
        </Select>
        {/* {error && <FormHelperText>{helperText}</FormHelperText>} */}
      </FormControl>
    </Grid>
  );
};
export default Dropdown;
