import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  TextField,
  TableRow,
  TableCell,
  CircularProgress,
} from '@material-ui/core';
import TableBuilder from '../uis/TableBuilder';
import { getSaleTableHeaders } from '../../utilities/helpers/tableHelpers';
import useStyles from '../../styles/useStyles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SaleToolTip from '../uis/SaleComponents/SaleToolTip';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import { setFetchApiInfo, fetchApi } from '../../store/actions/globalAction';
import { itemSearch } from '../../http/itemApi';
import { getItemTotal } from '../../utilities/helpers/saleHelpers';
import { setCartItems } from '../../store/actions/saleActions';
import '../../styles/style.css';
import CustomerSearch from '../uis/SaleComponents/CustomerSearch';
import TotalDueCard from '../uis/SaleComponents/TotalDueCard';
import PaymentMethodsInfo from '../uis/SaleComponents/PaymentTypeTableNew';
import PaymentMethodSelection from '../uis/SaleComponents/PaymentMethodSelection';
import { createSale } from '../../http/saleApi';

const SalesNew = ({ setFetchApiInfo, cartItems, setCartItems }) => {
  const classes = useStyles();
  const editableRowIndexes = ['quantity', 'discount'];
  const [searchWord, setSearchWord] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [highlightedOption, setHighlightedOption] = useState();
  const [fetchItems, setFetchItems] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [payAmount, setPayAmount] = useState(0);
  const [buttonName, setButtonName] = useState('Complete Sale');
  const [dueDate, setDueDate] = useState('2020-02-02');
  const defaultCustomer = {
    id: 1,
    firstName: 'Default',
    lastName: 'Customer',
    email: 'defaultCustomer@gmail.com',
  };

  const getCartTotal = useCallback(() => {
    let cartTotal = 0;
    cartItems.forEach(row => {
      cartTotal = cartTotal + parseFloat(getItemTotal(row));
    });
    return parseFloat(cartTotal).toFixed(2);
  }, [cartItems]);

  const getTotalReceivedAmount = useCallback(() => {
    let totalReceivedAmount = 0;
    paymentMethods.forEach(method => {
      totalReceivedAmount = totalReceivedAmount + parseFloat(method.amount);
    });
    return parseFloat(totalReceivedAmount).toFixed(2);
  }, [paymentMethods]);

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

  useEffect(() => {
    const handleItemSearchSuccuess = resp => {
      setFetchItems(false);
      if (Array.isArray(resp.data)) {
        setSuggestions(resp.data);
      }
    };

    const handleItemSearchErr = err => {
      setFetchItems(false);
      setFetchApiInfo({ type: 'error', error: 'Unable to search items' });
      console.log(err);
    };
    setFetchItems(true);
    itemSearch(searchWord)
      .then(handleItemSearchSuccuess)
      .catch(handleItemSearchErr);
  }, [searchWord, setFetchApiInfo]);
  const handleFocus = event => event.target.select();
  const handleItemSearchSubmit = (_e, value) => {
    setHighlightedOption();
    if (value) {
      const {
        item: { id, itemName },
        salesPrice,
        id: itemStatId,
      } = value;
      cartItems.push({
        id,
        itemName,
        salesPrice: parseFloat(salesPrice).toFixed(2),
        quantity: 1,
        discount: parseFloat(0).toFixed(2),
        total: parseFloat(salesPrice).toFixed(2),
        itemStatId,
      });
      setCartItems([...cartItems]);
      updateDisplayTotal();
    }
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

  const tableRows = cartItems.map((row, rowIndex) => {
    if (row.id) {
      const deleteClick = () => {
        cartItems.splice(rowIndex, 1);
        setCartItems([...cartItems]);
      };
      return (
        <TableRow hover key={`${rowIndex}+${row.id}`}>
          {Object.keys(row).map(cell => {
            row.total = getItemTotal(row);
            if (editableRowIndexes.includes(cell)) {
              const handleTextInputChange = event => {
                const { value } = event.target;
                if (value >= 0) {
                  console.log(value);
                  row[cell] = value;
                  setCartItems([...cartItems]);
                  updateDisplayTotal();
                }
              };

              console.log(row[cell]);
              return (
                <TableCell key={cell}>
                  <TextField
                    id={cell}
                    name={cell}
                    onFocus={handleFocus}
                    autoFocus={cell === 'quantity'}
                    value={row[cell]}
                    onChange={handleTextInputChange}
                    onKeyDown={handleKeyDown(cell)}
                  />
                </TableCell>
              );
            }
            return <TableCell key={cell}>{row[cell]}</TableCell>;
          })}
          <TableCell key={'delete'} align='right'>
            <DeleteIcon onClick={deleteClick} />
          </TableCell>
        </TableRow>
      );
    }
    return null;
  });

  const handleSearchChange = e => setSearchWord(e.target.value);

  const handleSearchCustomerSubmit = (_e, value) => {
    setCustomer(value);
  };

  const handleRemoveSelectedCustomer = () => {
    setCustomer(defaultCustomer);
  };
  const [customer, setCustomer] = useState({
    id: 2,
    firstName: 'Marjan',
    lastName: 'Mukram',
    email: 'marjan.emeraldit@gmail.com',
  });

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

  const revdAmount = 0;
  const handleAddSubmit = e => {
    e.preventDefault();
    if (buttonName === 'Add Payment') {
      addPaymentMethod();
    }
    if (buttonName === 'Complete Sale') {
      addPaymentMethod();
      handleCreateSale();
    }
  };

  useEffect(() => {
    if ((getCartTotal() - getTotalReceivedAmount()).toFixed(2) > 0) {
      setPayAmount(
        parseFloat(getCartTotal() - getTotalReceivedAmount()).toFixed(2)
      );
    } else {
      setPayAmount(parseFloat(0).toFixed(2));
    }
  }, [getCartTotal, getTotalReceivedAmount]);

  const addPaymentMethod = () => {
    setPaymentMethods([
      ...paymentMethods,
      {
        type: paymentMethod,
        amount: parseFloat(payAmount).toFixed(2),
      },
    ]);
  };

  const handleCreateSale = () => {
    const paymentType = {};
    paymentMethods.forEach(({ amount, type }) => {
      paymentType[`${type}`] = amount;
    });
    paymentType[`${paymentMethod}`] = parseFloat(payAmount).toFixed(2);
    const newSale = {
      customerId: customer.id,
      total: getCartTotal(),
      totalDiscount: 0,
      paymentType,
      balance: getBalance(),
      revdAmount,
      itemSales,
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

  useEffect(() => {
    if (
      parseFloat(getTotalReceivedAmount()) + parseFloat(payAmount) >=
      parseFloat(getCartTotal())
    ) {
      setButtonName('Complete Sale');
    } else {
      setButtonName('Add Payment');
    }
  }, [getCartTotal, getTotalReceivedAmount, payAmount]);

  const handleButtonName = () => {};

  const handlePayAmount = e => {
    if (e.target.value >= 0) {
      setPayAmount(e.target.value);
      handleButtonName();
    }
  };

  const handleDueDateChange = date => {
    setDueDate(date);
  };

  const searchComponent = (
    <div className={classes.inputsTop}>
      <div className={classes.searchTab}>
        <Autocomplete
          id='sales-item-search'
          renderOption={option => {
            if (option.detail) {
              return <SaleToolTip option={option} />;
            }
            return <div>{`${option.item.id}-${option.item.itemName}`}</div>;
          }}
          getOptionLabel={option => `${option.item.id}-${option.item.itemName}`}
          options={
            highlightedOption
              ? [...suggestions, { ...highlightedOption, detail: true }]
              : suggestions
          }
          onChange={handleItemSearchSubmit}
          onHighlightChange={(_event, selectedOpt) => {
            setHighlightedOption(selectedOpt);
          }}
          getOptionDisabled={opt => opt.detail}
          disabledItemsFocusable
          loading={fetchItems}
          onFocus={handleFocus}
          renderInput={params => (
            <TextField
              autoFocus
              {...params}
              label='Enter an Item Code, Item Name or Item Id'
              noOptionsText={'No items found'}
              onChange={handleSearchChange}
              InputProps={{
                ...params.InputProps,
                startAdornment: <SearchIcon />,
                endAdornment: (
                  <React.Fragment>
                    {fetchItems && (
                      <CircularProgress color='inherit' size={20} />
                    )}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          )}
        />
      </div>
    </div>
  );

  return (
    <div className={classes.salesContainer}>
      <Container className={classes.salesItemTable}>
        <TableBuilder
          tableData={[]}
          tableHeaders={getSaleTableHeaders}
          tableTopUis={searchComponent}
          hidePagination
          tableRows={tableRows.reverse()}
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
