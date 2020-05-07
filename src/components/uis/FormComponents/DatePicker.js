import React from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';

const DatePicker = ({ entry }) => {
  const { label, name, value, required, id } = entry;
  const handleDateChange = date => {
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
          margin='medium'
          id={id}
          name={name}
          label={label}
          format='  MM  / dd  / yyyy  '
          value={selectedDate}
          onChange={handleDateChange}
          fullWidth
          required={required}
        />
      </MuiPickersUtilsProvider>
    </Grid>
  );
};

export default DatePicker;
