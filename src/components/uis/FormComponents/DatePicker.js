import React from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const DatePicker = ({ entry, handleDatePickerChange }) => {
  const { label, name, value } = entry;
  const handleDateChange = (date) => {
    console.log(date);
    setSelectedDate(date);
  };
  const [selectedDate, setSelectedDate] = React.useState(
    value ? new Date(value) : new Date()
  );
  return (
    <Grid item xs={6}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          margin="medium"
          id="date-picker-dialog"
          name={name}
          label={label}
          format="  MM  / dd  / yyyy  "
          value={selectedDate}
          onChange={handleDateChange}
          fullWidth
        />
      </MuiPickersUtilsProvider>
    </Grid>
  );
};

export default DatePicker;
