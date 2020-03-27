import React from "react";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { Grid } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

const DatePicker = ({ entry, selectedDate, handleDatePickerChange }) => {
  const { label, name } = entry;
  const handleDateChange = date => {
    console.log(date);
    handleDatePickerChange(date, name);
  };
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify='left'>
        <KeyboardDatePicker
          margin='normal'
          id='date-picker-dialog'
          name={name}
          label={label}
          format='MM/dd/yyyy'
          value={selectedDate}
          onChange={handleDateChange}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

export default DatePicker;
