import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import useStyles from '../../../styles/useStyles';
import Button from '@material-ui/core/Button';
import Barcode from 'react-barcode';
import { getItemTotal } from '../../../utilities/helpers/receiveHelpers';
import { createReceive } from '../../../http/receiveApi';
import ConfirmationPopup from '../../uis/ConfirmationPopup';
import { setCartItems } from '../../../store/actions/receiveAction';
import { setFetchApiInfo, fetchApi } from '../../../store/actions/globalAction';
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { searchSupplier } from '../../../http/supplierApi';
import { CircularProgress } from '@material-ui/core';
import PaymentDropdown from '../../uis/PaymentDropdown';
const Receive = ({ cartItems, setCartItems, setFetchApiInfo, fetchApi }) => {
  const classes = useStyles();
  const [supplierId, setsupplierId] = useState(1);
  const [payedAmount, setPayedAmount] = useState(parseFloat(0).toFixed(2));
  const [suggestions, setSuggestions] = useState([]);
  const [fetchCustomers, setFetchCustomers] = useState(false);
  const [paymentType, setPaymentType] = useState('cash');

  const handleCashAmountChange = e => {
    if (e.target.value >= 0) {
      setPayedAmount(e.target.value);
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
    payedAmount > 0
      ? parseFloat(payedAmount - cartTotal).toFixed(2)
      : payedAmount;
  const handleFocus = e => e.target.select();

  const handleReceiveSubmit = e => {
    e.preventDefault();
    const itemReceives = [];
    cartItems.forEach(item => {
      const { receivePrice, discount, quantity, id } = item;
      const receiveItem = {
        receivePrice,
        discount,
        quantity,
        itemId: id,
        description: '',
        supplierId: 7,
        expDate: '2025-05-05',
        manuDate: '2019-05-05',
        salesPrice: 25,
      };
      itemReceives.push(receiveItem);
    });
    const newReceive = {
      supplierId,
      total: cartTotal,
      totalDiscount: 0,
      paymentType,
      balance,
      payedAmount,
      itemReceives,
      cashBookDetails: {
        refNo: '25',
        description: 'Desc123455',
        type: 'cash',
        amount: cartTotal,
      },
    };
    const handleCreateReceiveSuccuess = () => {
      fetchApi(false);
      setCartItems([]);
      setPayedAmount(parseFloat(0).toFixed(2));
      setFetchApiInfo({ type: 'success', message: 'Bill created succuess' });
    };

    const handlereateReceiveError = () => {
      fetchApi(false);
      setFetchApiInfo({
        type: 'error',
        message: 'Error occured in bill creation',
      });
    };
    fetchApi(true);
    createReceive(newReceive)
      .then(handleCreateReceiveSuccuess)
      .catch(handlereateReceiveError);
  };

  const handleSearchSubmit = (_e, value) => {
    setsupplierId(value.id);
  };

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
      setFetchApiInfo({ type: 'error', message: 'Unable to search suppliers' });
      setFetchCustomers(false);
    };
    setFetchCustomers(true);
    searchSupplier(e.target.value)
      .then(searchSuccess)
      .catch(searchErr);
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
              label='Enter a Supplier Name or Id'
              noOptionsText={'No suppliers found'}
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
      <form onSubmit={handleReceiveSubmit}>
        {searchComponent}
        <div className={classes.sideMenuPageBottomInputs}>
          <div className={classes.total}>
            <TextField
              id='receive-total-inputs'
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
              id='receive-cash-inputs'
              label='Amount'
              value={payedAmount}
              onChange={handleCashAmountChange}
              onFocus={handleFocus}
              autoComplete='off'
            />
          </div>
          <div className={classes.balance}>
            <TextField
              id='receive-balance-inputs'
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
              id='proceedReceive'
            >
              Proceed Receive
            </Button>
          </div>
          <div>
            <Button
              className={classes.button}
              variant='contained'
              color='secondary'
              onClick={handleDiscardClick}
              id='discardReceive'
            >
              Discard Receive
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
          id='discardReceivePopup'
          header='Confirm discard bill'
          content='Are you sure want to discard this receive and create a new receive?'
        />
      )}
    </Fragment>
  );
};

const mapStateToProps = ({ global, receive }) => ({ ...global, ...receive });

const mapActionToProps = { setCartItems, setFetchApiInfo, fetchApi };

export default connect(mapStateToProps, mapActionToProps)(Receive);
