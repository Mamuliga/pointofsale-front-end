import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { Container } from '@material-ui/core';
import TableBuilder from '../uis/TableBuilder';
import { getSaleTableHeaders } from '../../utilities/helpers/tableHelpers';
import useStyles from '../../styles/useStyles';
import { setFetchApiInfo, fetchApi } from '../../store/actions/globalAction';
import { getItemTotal } from '../../utilities/helpers/saleHelpers';
import { setCartItems } from '../../store/actions/saleActions';
import CustomerSearch from '../uis/SaleComponents/CustomerSearch';
import TotalDueCard from '../uis/SaleComponents/TotalDueCard';
import PaymentMethodsInfo from '../uis/SaleComponents/PaymentTypeTableNew';
import PaymentMethodSelection from '../uis/SaleComponents/PaymentMethodSelection';
import { createSale } from '../../http/saleApi';
import SaleItemSearch from '../uis/SaleComponents/SaleItemSearch';
import SaleTableRows from '../uis/SaleComponents/SaleTableRows';

const SalesNew = ({ setFetchApiInfo, cartItems, setCartItems }) => {
  const classes = useStyles();
  const revdAmount = 0;
  const defaultCustomer = {
    id: 1,
    firstName: 'Default',
    lastName: 'Customer',
    email: 'defaultCustomer@gmail.com',
  };
  const SALE_PAY_BUTTON_NAMES = ['Complete Sale', 'Add Payment'];

  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [payAmount, setPayAmount] = useState(0);
  const [buttonName, setButtonName] = useState(SALE_PAY_BUTTON_NAMES[0]);
  const [dueDate, setDueDate] = useState('2020-02-02');
  const [customer, setCustomer] = useState({
    id: 2,
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

  const getItemSales = () => {
    const itemSales = [];
    cartItems.forEach(item => {
      const {
        id,
        quantity,
        discount,
        itemStatId,
        salesPrice: sellingPrice,
      } = item;
      itemSales.push({
        itemId: id,
        sellingPrice,
        quantity,
        discount,
        itemStatId,
      });
    });
    return itemSales;
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
        document.getElementById('sales-payment-amount').focus();
      } else if (e.key === 'Enter') {
        document.getElementById('sales-item-search').focus();
      }
    };
    return keyDown;
  };

  const handleSearchCustomerSubmit = (_e, value) => {
    setCustomer(value);
  };

  const handleRemoveSelectedCustomer = () => {
    setCustomer(defaultCustomer);
  };

  const handleAddSubmit = e => {
    e.preventDefault();
    if (buttonName === SALE_PAY_BUTTON_NAMES[1]) {
      addPaymentMethod();
    }
    if (buttonName === SALE_PAY_BUTTON_NAMES[0]) {
      addPaymentMethod();
      handleCreateSale();
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

  const handleCreateSale = () => {
    const newSale = {
      customerId: customer.id,
      total: getCartTotal(),
      totalDiscount: 0,
      paymentType: getPaymentTypeObject(),
      balance: getBalance(),
      revdAmount,
      itemSales: getItemSales(cartItems),
      dueDate,
    };

    const handleCreateSaleSuccuess = () => {
      fetchApi(false);
      setCartItems([]);
      setPayAmount(parseFloat(0).toFixed(2));
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

  const handlePayButtonName = () => {
    if (
      parseFloat(getTotalReceivedAmount()) + parseFloat(payAmount) >=
      parseFloat(getCartTotal())
    ) {
      setButtonName(SALE_PAY_BUTTON_NAMES[0]);
    } else {
      setButtonName(SALE_PAY_BUTTON_NAMES[1]);
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
      <SaleTableRows
        updateDisplayTotal={updateDisplayTotal}
        handleKeyDown={handleKeyDown}
        getItemTotal={getItemTotal}
        row={row}
        rowIndex={rowIndex}
      />
    ));

  return (
    <div className={classes.salesContainer}>
      <Container className={classes.salesItemTable}>
        <TableBuilder
          tableData={[]}
          tableHeaders={getSaleTableHeaders}
          tableTopUis={
            <SaleItemSearch updateDisplayTotal={updateDisplayTotal} />
          }
          hidePagination
          tableRows={getTableRows().reverse()}
        />
      </Container>

      <div className={classes.salesRightMenu}>
        <CustomerSearch
          handleSearchCustomerSubmit={handleSearchCustomerSubmit}
          handleRemoveSelectedCustomer={handleRemoveSelectedCustomer}
          customer={customer}
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
  setCartItems,
};

export default connect(mapStateToProps, mapActionToProps)(SalesNew);
