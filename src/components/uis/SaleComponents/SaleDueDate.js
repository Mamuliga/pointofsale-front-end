import React from 'react';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import DateFnsUtils from '@date-io/date-fns';
import useStyles from '../../../styles/useStyles';

const SaleDueDatePicker = ({ dueDate, handleDueDateChange }) => {
  const classes = useStyles();
  let className;
  if (dueDate === null) {
    className = classes.salesDueDateCalendarShrink;
  } else {
    className = classes.salesDueDateCalendarExpand;
  }

  return (
    <div className={classes.salesdueDateCalendar}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          className={className}
          onChange={handleDueDateChange}
          value={dueDate}
          error={false}
          format=' yyyy / MM / dd'
          helperText='Due Date'
          minDate={new Date().toJSON().slice(0, 10)}
        />
      </MuiPickersUtilsProvider>
      {dueDate && <RemoveCircleIcon onClick={handleDueDateChange} />}
    </div>
  );
};

export default SaleDueDatePicker;
