import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import useStyles from '../../../styles/useStyles';
import Button from '@material-ui/core/Button';
import Barcode from 'react-barcode';
import { getItemTotal } from '../../../utilities/helpers/receiveHelpers';
import { createReceive } from '../../../http/receiveApi';
import ConfirmationPopup from '../../uis/ConfirmationPopup';
import { setCartItems } from '../../../store/actions/receiveActions';
import { setFetchApiInfo, fetchApi } from '../../../store/actions/globalAction';

const Receive = ({ cartItems, setCartItems, setFetchApiInfo, fetchApi }) => {
  const classes = useStyles();
  const [revdAmount, setRevdAmount] = useState(parseFloat(0).toFixed(2));
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
  const handleReceiveSubmit = e => {
    e.preventDefault();
    const newReceive = {
      customerId: 1,
      total: cartTotal,
      totalDiscount: 0,
      paymentType: 'cash',
      balance,
      revdAmount,
      itemReceive: cartItems,
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
      setRevdAmount(parseFloat(0).toFixed(2));
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

  return (
    <Fragment>
      <form onSubmit={handleReceiveSubmit}>
        <div className={classes.customerName}>
          <TextField id='receive-customer-name' label='Customer Name' />
        </div>
        <div className={classes.receivePageBottomInputs}>
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
          <div className={classes.cash}>
            <TextField
              id='receive-cash-inputs'
              label='Cash'
              value={revdAmount}
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
