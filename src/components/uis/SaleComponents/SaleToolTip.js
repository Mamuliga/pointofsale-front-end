import React from 'react';
import useStyles from '../../../styles/useStyles';

const SaleToolTip = ({ option }) => {
  const classes = useStyles();
  return (
    <li className={classes.searchItemSuggestionBox}>
      <div className={`${classes.toolTipRows} ${classes.toolTipFirstRow}`}>
        <span>{`Price : ${option.salesPrice}`}</span>
        <span>{`Available qty : ${option.quantity}`}</span>
        <span>
          {`Supp. name : ${option.supplier.firstName} ${option.supplier.lastName}`}
        </span>
      </div>
      <div className={`${classes.toolTipRows} ${classes.toolTipSecondRow}`}>
        <span>{`Exp. date : ${option.expDate}`}</span>
        <span>{`Manu. date : ${option.manuDate}`}</span>
      </div>
    </li>
  );
};

export default SaleToolTip;
