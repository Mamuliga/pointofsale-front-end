import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { Container } from '@material-ui/core';
import TableBuilder from '../uis/TableBuilder';
import { getReceiveTableHeaders } from '../../utilities/helpers/tableHelpers';
import useStyles from '../../styles/useStyles';
import { setFetchApiInfo, fetchApi } from '../../store/actions/globalAction';
import { getItemTotal } from '../../utilities/helpers/receiveHelpers';
import TotalDueCard from '../uis/SaleComponents/TotalDueCard';
import PaymentMethodsInfo from '../uis/SaleComponents/PaymentMethodsInfo';
import PaymentMethodSelection from '../uis/SaleComponents/PaymentMethodSelection';
import { createReceive } from '../../http/receiveApi';
import ReceiveTableRows from '../uis/SaleComponents/ReceiveTableRows';
import ReceiveItemSearch from '../uis/SaleComponents/ReceiveItemSearch';
import SupplierSearch from '../uis/ReceiveComponents/SupplierSearch';

const Receives = ({ setFetchApiInfo }) => {
  const classes = useStyles();
  const payedAmount = 0;
  const defaultSupplier = {
    id: 1,
    firstName: 'Default',
    lastName: 'Supplier',
    email: 'defaultSupplier@gmail.com',
  };
  const RECEIVE_PAY_BUTTON_NAMES = ['Complete Receive', 'Add Receive'];

  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [payAmount, setPayAmount] = useState(0);
  const [buttonName, setButtonName] = useState(RECEIVE_PAY_BUTTON_NAMES[0]);
  const [dueDate, setDueDate] = useState('2020-02-02');
  const [cartItems, setCartItems] = useState([]);
  const [supplier, setSupplier] = useState({
    id: 1,
    firstName: 'Marjan',
    lastName: 'Mukram',
    email: 'marjan.emeraldit@gmail.com',
  });

  const handleCartTotal = () => {
    let cartTotal = 0;
    cartItems.forEach(row => {
      cartTotal = cartTotal + parseFloat(getItemTotal(row));
    });
    return parseFloat(cartTotal).toFixed(2);
  };

  const handleTotalReceivedAmount = () => {
    let totalReceivedAmount = 0;
    paymentMethods.forEach(method => {
      totalReceivedAmount = totalReceivedAmount + parseFloat(method.amount);
    });
    return parseFloat(totalReceivedAmount).toFixed(2);
  };

  const getItemReceives = () => {
    const itemReceives = [];
    cartItems.forEach(item => {
      const {
        id,
        quantity,
        discount,
        itemStatId,
        salesPrice: sellingPrice,
      } = item;
      itemReceives.push({
        itemId: id,
        sellingPrice,
        quantity,
        discount,
        itemStatId,
      });
    });
    return itemReceives;
  };

  const getBalance = () => {
    if (getTotalReceivedAmount() > 0) {
      return parseFloat(getTotalReceivedAmount() - getCartTotal()).toFixed(2);
    }
    return getTotalReceivedAmount();
  };

  const updateDisplayTotal = () => {
    setPayAmount(getCartTotal());
  };

  const handlePaymentMethod = payMethod => {
    setPaymentMethod(payMethod);
  };

  const handleKeyDown = cell => {
    const keyDown = e => {
      if (e.key === 'Tab' && cell === 'discount') {
        document.getElementById('receive-total-inputs').focus();
      } else if (e.key === 'Enter') {
        document.getElementById('receive-item-search').focus();
      }
    };
    return keyDown;
  };

  const handleSearchSupplierSubmit = (_e, value) => {
    setSupplier(value);
  };

  const handleRemoveSelectedSupplier = () => {
    setSupplier(defaultSupplier);
  };

  const handleAddSubmit = e => {
    e.preventDefault();
    if (buttonName === RECEIVE_PAY_BUTTON_NAMES[1]) {
      addPaymentMethod();
    }
    if (buttonName === RECEIVE_PAY_BUTTON_NAMES[0]) {
      addPaymentMethod();
      handleCreateReceive();
    }
  };

  const handleSetPayAmount = () => {
    if ((getCartTotal() - getTotalReceivedAmount()).toFixed(2) > 0) {
      setPayAmount(
        parseFloat(getCartTotal() - getTotalReceivedAmount()).toFixed(2)
      );
    } else {
      setPayAmount(parseFloat(0).toFixed(2));
    }
  };

  const handlePayAmount = e => {
    if (e.target.value >= 0) {
      setPayAmount(e.target.value);
    }
  };

  const handleDueDateChange = date => {
    setDueDate(date);
  };

  const addPaymentMethod = () => {
    setPaymentMethods([
      ...paymentMethods,
      {
        type: paymentMethod,
        amount: parseFloat(payAmount).toFixed(2),
      },
    ]);
  };

  const getPaymentTypeObject = () => {
    const paymentType = {};
    paymentMethods.forEach(({ amount, type }) => {
      paymentType[`${type}`] = amount;
    });
    paymentType[`${paymentMethod}`] = parseFloat(payAmount).toFixed(2);
    return paymentType;
  };

  const handleCreateReceive = () => {
    const newReceive = {
      supplierId: supplier.id,
      total: getCartTotal(),
      totalDiscount: 0,
      paymentType: getPaymentTypeObject(),
      balance: getBalance(),
      payedAmount,
      itemReceives: getItemReceives(cartItems),
      dueDate,
    };

    const handleCreateReceiveSuccuess = () => {
      fetchApi(false);
      setCartItems([]);
      setPayAmount(parseFloat(0).toFixed(2));
      setFetchApiInfo({ type: 'success', message: 'Bill created succuess' });
    };

    const handleCreateReceiveError = () => {
      fetchApi(false);
      setFetchApiInfo({
        type: 'error',
        message: 'Error occured in bill creation',
      });
    };
    fetchApi(true);
    createReceive(newReceive)
      .then(handleCreateReceiveSuccuess)
      .catch(handleCreateReceiveError);
  };

  const handlePayButtonName = () => {
    if (
      parseFloat(getTotalReceivedAmount()) + parseFloat(payAmount) >=
      parseFloat(getCartTotal())
    ) {
      setButtonName(RECEIVE_PAY_BUTTON_NAMES[0]);
    } else {
      setButtonName(RECEIVE_PAY_BUTTON_NAMES[1]);
    }
  };

  const getCartTotal = useCallback(handleCartTotal, [cartItems]);

  const getTotalReceivedAmount = useCallback(handleTotalReceivedAmount, [
    paymentMethods,
  ]);

  useEffect(handleSetPayAmount, [getCartTotal, getTotalReceivedAmount]);

  useEffect(handlePayButtonName, [
    getCartTotal,
    getTotalReceivedAmount,
    payAmount,
  ]);

  const getTableRows = () =>
    cartItems.map((row, rowIndex) => (
      <ReceiveTableRows
        updateDisplayTotal={updateDisplayTotal}
        handleKeyDown={handleKeyDown}
        getItemTotal={getItemTotal}
        row={row}
        rowIndex={rowIndex}
        setCartItems={setCartItems}
        cartItems={cartItems}
      />
    ));

  return (
    <div className={classes.salesContainer}>
      <Container className={classes.salesItemTable}>
        <TableBuilder
          tableData={[]}
          tableHeaders={getReceiveTableHeaders}
          tableTopUis={
            <ReceiveItemSearch
              updateDisplayTotal={updateDisplayTotal}
              setCartItems={setCartItems}
              cartItems={cartItems}
            />
          }
          hidePagination
          tableRows={getTableRows().reverse()}
        />
      </Container>

      <div className={classes.salesRightMenu}>
        <SupplierSearch
          handleRemoveSelectedSupplier={handleRemoveSelectedSupplier}
          handleSearchSupplierSubmit={handleSearchSupplierSubmit}
          supplier={supplier}
        />
        <PaymentMethodsInfo
          paymentMethods={paymentMethods}
          totalPayAmount={getTotalReceivedAmount()}
          handleDueDateChange={handleDueDateChange}
          dueDate={dueDate}
        />
        <TotalDueCard
          total={getCartTotal()}
          totalPayAmount={getTotalReceivedAmount()}
        />
        <PaymentMethodSelection
          handlePaymentMethod={handlePaymentMethod}
          paymentMethod={paymentMethod}
          handleAddSubmit={handleAddSubmit}
          handlePayAmount={handlePayAmount}
          payAmount={payAmount}
          buttonDisabled={!(payAmount > 0 && getCartTotal() > 0)}
          buttonName={buttonName}
          dueDate={dueDate}
          handleDueDateChange={handleDueDateChange}
        />
      </div>
    </div>
  );
};

const mapStateToProps = ({ global, sale }) => {
  return { ...global, ...sale };
};

const mapActionToProps = {
  setFetchApiInfo,
};

export default connect(mapStateToProps, mapActionToProps)(Receives);
