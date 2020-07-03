import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { CircularProgress } from '@material-ui/core';
import useStyles from '../../../styles/useStyles';
import Button from '@material-ui/core/Button';
import Barcode from 'react-barcode';
import { getItemTotal } from '../../../utilities/helpers/saleHelpers';
import { createSale } from '../../../http/saleApi';
import ConfirmationPopup from '../../uis/ConfirmationPopup';
import { setCartItems } from '../../../store/actions/saleActions';
import { setFetchApiInfo, fetchApi } from '../../../store/actions/globalAction';
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { searchCustomer } from '../../../http/customerApi';
import PaymentDropdown from '../../uis/PaymentDropdown';

const Sale = ({ cartItems, setCartItems, setFetchApiInfo, fetchApi }) => {
  const classes = useStyles();
  const [revdAmount, setRevdAmount] = useState(parseFloat(0).toFixed(2));
  const [suggestions, setSuggestions] = useState([]);
  const [fetchCustomers, setFetchCustomers] = useState(false);
  const [paymentType, setPaymentType] = useState('cash');
  const handleCashAmountChange = e => {
    if (e.target.value >= 0) {
      setRevdAmount(e.target.value);
    }
  };
  const [openConfirm, setOpenConfirmation] = React.useState(false);
  const handleDiscard = () => {
    setCartItems([]);
    setOpenConfirmation(false);
  };
  const handleDiscardClick = () => {
    if (cartItems.length) {
      handleOpenConfirmation();
    }
  };
  const handleOpenConfirmation = () => {
    setOpenConfirmation(true);
  };

  const handleCloseConfiramtion = () => {
    setOpenConfirmation(false);
  };
  let cartTotal = 0;
  cartItems.forEach(row => {
    cartTotal = cartTotal + parseFloat(getItemTotal(row));
  });
  cartTotal = parseFloat(cartTotal).toFixed(2);
  const balance =
    revdAmount > 0 ? parseFloat(revdAmount - cartTotal).toFixed(2) : revdAmount;
  const handleFocus = e => e.target.select();
  const handleSaleSubmit = e => {
    e.preventDefault();
    const newSale = {
      customerId: 1,
      total: cartTotal,
      totalDiscount: 0,
      paymentType,
      balance,
      revdAmount,
      itemSales: cartItems,
      cashBookDetails: {
        refNo: '25',
        description: 'Desc123455',
        type: 'cash',
        amount: cartTotal,
      },
    };
    const handleCreateSaleSuccuess = () => {
      fetchApi(false);
      setCartItems([]);
      setRevdAmount(parseFloat(0).toFixed(2));
      setFetchApiInfo({ type: 'success', message: 'Bill created succuess' });
    };

    const handlereateSaleError = () => {
      fetchApi(false);
      setFetchApiInfo({
        type: 'error',
        message: 'Error occured in bill creation',
      });
    };
    fetchApi(true);
    createSale(newSale)
      .then(handleCreateSaleSuccuess)
      .catch(handlereateSaleError);
  };

  const handleSearchSubmit = () => {};

  const handlePaymentMethod = e => {
    setPaymentType(e.target.value);
  };

  const handleSearchChange = e => {
    const searchSuccess = res => {
      setFetchCustomers(false);
      console.log(res.data);
      if (Array.isArray(res.data)) {
        setSuggestions(res.data);
      }
    };

    const searchErr = () => {
      setFetchApiInfo({ type: 'error', message: 'Unable to search customers' });
      setFetchCustomers(false);
    };
    setFetchCustomers(true);
    searchCustomer(e.target.value).then(searchSuccess).catch(searchErr);
  };

  const searchComponent = (
    <div className={classes.inputsTop}>
      <div className={classes.searchTab}>
        <Autocomplete
          id='customer search-item-search'
          getOptionLabel={option => `${option.firstName}-${option.lastName}`}
          options={suggestions}
          onChange={handleSearchSubmit}
          loading={fetchCustomers}
          renderInput={params => (
            <TextField
              autoFocus
              {...params}
              label='Enter a Customer name or Id'
              noOptionsText={'No customers found'}
              variant='outlined'
              onChange={handleSearchChange}
              InputProps={{
                ...params.InputProps,
                startAdornment: <SearchIcon />,
                endAdornment: (
                  <Fragment>
                    {fetchCustomers && (
                      <CircularProgress color='inherit' size={20} />
                    )}
                    {params.InputProps.endAdornment}
                  </Fragment>
                ),
              }}
            />
          )}
        />
      </div>
    </div>
  );
  return (
    <Fragment>
      <form onSubmit={handleSaleSubmit}>
        {searchComponent}
        <div className={classes.sideMenuPageBottomInputs}>
          <div className={classes.total}>
            <TextField
              id='sale-total-inputs'
              label='Total'
              value={cartTotal}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <PaymentDropdown
            paymentType={paymentType}
            handlePaymentMethod={handlePaymentMethod}
          />
          <div className={classes.cash}>
            <TextField
              id='sale-cash-inputs'
              label='Amount'
              value={revdAmount}
              onChange={handleCashAmountChange}
              onFocus={handleFocus}
              autoComplete='off'
            />
          </div>
          <div className={classes.balance}>
            <TextField
              id='sale-balance-inputs'
              label='Balance'
              value={balance}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div>
            <Button
              className={classes.button}
              variant='contained'
              color='primary'
              type='submit'
              disabled={!cartItems.length}
              id='proceedSale'
            >
              Proceed Sale
            </Button>
          </div>
          <div>
            <Button
              className={classes.button}
              variant='contained'
              color='secondary'
              onClick={handleDiscardClick}
              id='discardSale'
            >
              Discard Sale
            </Button>
            <div className={classes.barcode}>
              <Barcode value='0000000000001' />
            </div>
          </div>
        </div>
      </form>
      {openConfirm && (
        <ConfirmationPopup
          open={openConfirm}
          close={handleCloseConfiramtion}
          handleAgree={handleDiscard}
          id='discardSalePopup'
          header='Confirm discard bill'
          content='Are you sure want to discard this sale and create a new sale?'
        />
      )}
    </Fragment>
  );
};

const mapStateToProps = ({ global, sale }) => ({ ...global, ...sale });

const mapActionToProps = { setCartItems, setFetchApiInfo, fetchApi };

export default connect(mapStateToProps, mapActionToProps)(Sale);
