import React from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const DatePicker = (id, name, value) => {
  // const { label, name, value, required, id } = entry;
  const handleDateChange = date => {
    console.log(date);
    setSelectedDate(date);
  };
  const [selectedDate, setSelectedDate] = React.useState(
    value ? new Date(value) : new Date()
  );
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        margin='medium'
        id={id}
        name={name}
        format='  MM  / dd  / yyyy  '
        value={selectedDate}
        onChange={handleDateChange}
        // label={label}
        // fullWidth
        // required={required}
      />
    </MuiPickersUtilsProvider>
  );
};

export default DatePicker;
