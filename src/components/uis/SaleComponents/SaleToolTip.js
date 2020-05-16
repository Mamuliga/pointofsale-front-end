import React from 'react';
import useStyles from '../../../styles/useStyles';

const SaleToolTip = ({ option }) => {
  const classes = useStyles();
  return (
    <li
      className={classes.searchItemSuggestionBox}
      style={{ position: 'absolute', top: '400px' }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontWeight: 'bold',
        }}
      >
        <span>{`Price : ${option.salesPrice}`}</span>
        <span>{`Available qty : ${option.quantity}`}</span>
        <span>
          {`Supp. name : ${option.supplier.firstName} ${option.supplier.lastName}`}
        </span>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          fontWeight: 'bold',
        }}
      >
        <span>{`Exp. date : ${option.expDate}`}</span>
        <span>{`Manu. date : ${option.manuDate}`}</span>
      </div>
    </li>
  );
};

export default SaleToolTip;
