import React from 'react';
import useStyles from '../../../styles/useStyles';
import { Card } from '@material-ui/core';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

const PaymentMethodsInfo = ({
  paymentMethods,
  setPaymentMethod,
  handleDueDateChange,
  dueDate,
}) => {
  const classes = useStyles();

  const handleDelete = i => {
    const deletePaymentMethod = () => {
      paymentMethods.splice(i, 1);
      console.log(paymentMethods);
      setPaymentMethod([...paymentMethods]);
    };
    return deletePaymentMethod;
  };
  return (
    <Card className={classes.cardSales}>
      <div>
        {paymentMethods.map((row, i) => {
          return (
            <div className={classes.salesPaymentTypeContainer} key={`row-${i}`}>
              <div className={classes.removePaymentTypeIcon}>
                <RemoveCircleIcon
                  onClick={handleDelete(i)}
                  className={classes.materialIcon}
                />
              </div>
              <div className={classes.salesPayContainerRow}>
                <div className={classes.salesPayContainerRowAmount}>
                  {row.type}
                  {row.type === 'due' && (
                    <div className={classes.salesdueDateCalendar}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          id='salesDueDates'
                          onChange={handleDueDateChange}
                          value={dueDate}
                          error={false}
                          format=' yyyy / MM / dd'
                          helperText='Due Date'
                          //settoday date here
                        />
                      </MuiPickersUtilsProvider>
                    </div>
                  )}
                  <div>{row.amount}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default PaymentMethodsInfo;
