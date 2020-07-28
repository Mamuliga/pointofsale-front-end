import React from 'react';
import useStyles from '../../../styles/useStyles';

const SaleToolTip = ({ option }) => {
  const {
    salesPrice,
    quantity,
    supplier: { firstName },
    expDate,
    manuDate,
  } = option;
  const classes = useStyles();
  const infoArray = [
    { key: 'Price', value: salesPrice },
    { key: 'Qty', value: quantity },
    { key: 'Exp Date', value: expDate },
    { key: 'Man. Date', value: manuDate },
    { key: 'Supplier', value: firstName },
  ];
  return (
    <div className={classes.searchItemSuggestionBox}>
      <div className={`${classes.toolTipRows} ${classes.toolTipFirstRow}`}>
        {infoArray.map(({ key, value }) => (
          <span className={classes.toolTipItemDisplay}>
            <div>{key}</div> <div className={classes.toolTipValue}>{value}</div>
          </span>
        ))}
      </div>
    </div>
  );
};

export default SaleToolTip;
