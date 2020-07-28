import React from 'react';
import { Card, Button, TextField, InputAdornment } from '@material-ui/core';
import useStyles from '../../../styles/useStyles';
import { PAYMENT_METHODS, CURRENCY } from '../../../utilities/constants';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const PaymentMethodSelection = ({
  handlePaymentMethod,
  paymentMethod,
  handleAddSubmit,
  handlePayAmount,
  payAmount,
  buttonDisabled,
  buttonName,
  handleDueDateChange,
  dueDate,
}) => {
  const classes = useStyles();
  return (
    <Card className={classes.cardSales}>
      <div>
        <div className={classes.paymentMethodButtons}>
          {PAYMENT_METHODS.map(method => (
            <Button
              key={method}
              variant={paymentMethod === method && 'contained'}
              color='secondary'
              onClick={() => handlePaymentMethod(method)}
            >
              {method}
            </Button>
          ))}
        </div>
        {paymentMethod === 'due' && (
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              onChange={handleDueDateChange}
              value={dueDate}
              error={false}
              format=' yyyy / MM / dd'
              helperText='Due Date'
              //settoday date here
            />
          </MuiPickersUtilsProvider>
        )}
      </div>
      <div>
        <form onSubmit={handleAddSubmit} className={classes.addSubmitPayment}>
          <TextField
            id='sales-payment-amount'
            variant='outlined'
            type='text'
            label='Payment Amount'
            placeholder='Add Payment Amount'
            className={classes.salesAddAmount}
            onChange={handlePayAmount}
            onFocus={e => e.target.select()}
            value={payAmount}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>{CURRENCY}</InputAdornment>
              ),
            }}
          />
          <Button
            type='submit'
            variant='contained'
            color='primary'
            disabled={buttonDisabled}
            className={classes.salesAddPayAmountButton}
          >
            {buttonName}
          </Button>
        </form>
      </div>
    </Card>
  );
};

export default PaymentMethodSelection;
