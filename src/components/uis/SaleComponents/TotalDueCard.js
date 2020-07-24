import React from 'react';
import { Card } from '@material-ui/core';
import useStyles from '../../../styles/useStyles';

const TotalDueCard = ({ total = 50, paidAmount = 20 }) => {
  const classes = useStyles();
  return (
    <Card className={classes.cardSales}>
      <div className={classes.totalDueAmountContainer}>
        <div className={classes.salesDisplayAmountBox}>
          <div>Total</div>
          <div className={classes.totalDueAmount}>{total}</div>
        </div>
        <div className={classes.salesDisplayAmountBox}>
          <div>Due</div>
          <div className={classes.totalDueAmount}>{total - paidAmount}</div>
        </div>
      </div>
    </Card>
  );
};

export default TotalDueCard;
