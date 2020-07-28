import React from 'react';
import { Card } from '@material-ui/core';
import useStyles from '../../../styles/useStyles';
import { CURRENCY } from '../../../utilities/constants';

const TotalDueCard = ({ total, totalPayAmount }) => {
  const classes = useStyles();
  return (
    <Card className={classes.cardSales}>
      <div className={classes.totalDueAmountContainer}>
        <div className={classes.salesDisplayAmountBox}>
          <div>Total</div>
          <div className={classes.salesTotalAmountDisplay}>
            {CURRENCY}. {total}
          </div>
        </div>
        <div className={classes.salesDisplayAmountBox}>
          <div>Due</div>
          <div className={classes.salesDueAmountDisplay}>
            {CURRENCY}. {parseFloat(total - totalPayAmount).toFixed(2)}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TotalDueCard;
