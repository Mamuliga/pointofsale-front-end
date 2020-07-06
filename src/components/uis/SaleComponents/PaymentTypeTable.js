import React, { useState } from 'react';
import useStyles from '../../../styles/useStyles';
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from '@material-ui/core';

const PaymentTypeTable = ({ paymentMethod, setPaymentMethod }) => {
  const classes = useStyles();

  const handleDelete = i => {
    // alert('delet');
    console.log('ewf');
    const deletePaymentMethod = () => {
      paymentMethod.splice(i, 1);
      console.log(paymentMethod);

      setPaymentMethod([...paymentMethod]);
    };
    return deletePaymentMethod;
  };
  return (
    <Paper className={classes.paymentTypeTable}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Delete</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paymentMethod.map((row, i) => {
            return (
              <TableRow key={`row-${i}`}>
                <TableCell>
                  <Button onClick={handleDelete(i)} color='secondary'>
                    Delete
                  </Button>
                </TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.amount}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default PaymentTypeTable;
