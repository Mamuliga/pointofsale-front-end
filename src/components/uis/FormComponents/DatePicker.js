import React from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { Grid, FormControl } from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'inline-block',
  },
  margin: {
    margin: theme.spacing(2),
  },
  textField: {
    width: '40ch',
  },
}));

const DatePicker = ({ entry, handleDatePickerChange }) => {
  const { label, name, value } = entry;
  const classes = useStyles();
  const handleDateChange = (date) => {
    console.log(date);
    setSelectedDate(date);
    handleDatePickerChange(date, name);
  };
  const [selectedDate, setSelectedDate] = React.useState(
    value ? new Date(value) : new Date()
  );
  return (
    <FormControl
      className={clsx(classes.root, classes.textField, classes.margin)}
    >
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="left">
          <KeyboardDatePicker
            margin="medium"
            id="date-picker-dialog"
            name={name}
            label={label}
            format="MM/dd/yyyy"
            value={selectedDate}
            onChange={handleDateChange}
          />
        </Grid>
      </MuiPickersUtilsProvider>
    </FormControl>
  );
};

export default DatePicker;
