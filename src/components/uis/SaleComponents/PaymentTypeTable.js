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

const PaymentTypeTable = () => {
  const classes = useStyles();
  const [paymentType, setPaymentType] = useState([
    {
      Type: 'cash',
      Amount: '1000',
    },
    {
      Type: 'due',
      Amount: '2000',
    },
    {
      Type: 'cheque',
      Amount: '4000',
    },
  ]);

  const handleDelete = i => {
    // alert('delet');
    console.log('ewf');
    const deletePaymentType = () => {
      paymentType.splice(i, 1);
      console.log(paymentType);

      setPaymentType([...paymentType]);
    };
    return deletePaymentType;
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
          {paymentType.map((row, i) => {
            return (
              <TableRow key={`row-${i}`}>
                <TableCell>
                  <Button onClick={handleDelete(i)} color='secondary'>
                    Delete
                  </Button>
                </TableCell>
                <TableCell>{row.Type}</TableCell>
                <TableCell>{row.Amount}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default PaymentTypeTable;
