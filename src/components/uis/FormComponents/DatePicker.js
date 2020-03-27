import React from "react";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { Grid } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

const DatePicker = ({
  datePickerLabel,
  selectedDate,
  handleDatePickerChange
}) => {
  const handleDateChange = date => {
    handleDatePickerChange(date, datePickerLabel);
  };
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify='left'>
        <KeyboardDatePicker
          margin='normal'
          id='date-picker-dialog'
          name={datePickerLabel}
          label={datePickerLabel}
          format='MM/dd/yyyy'
          value={selectedDate}
          onChange={handleDateChange}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

export default DatePicker;
