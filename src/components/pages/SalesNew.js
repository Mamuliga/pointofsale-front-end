import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  TextField,
  TableRow,
  TableCell,
  CircularProgress,
  Card,
} from '@material-ui/core';
import TableBuilder from '../uis/TableBuilder';
import { getSaleTableHeaders } from '../../utilities/helpers/tableHelpers';
import useStyles from '../../styles/useStyles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SaleToolTip from '../uis/SaleComponents/SaleToolTip';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import { setFetchApiInfo } from '../../store/actions/globalAction';
import { itemSearch } from '../../http/itemApi';
import { getItemTotal } from '../../utilities/helpers/saleHelpers';
import { setCartItems } from '../../store/actions/saleActions';
import '../../styles/style.css';
import CustomerSearch from '../uis/SaleComponents/CustomerSearch';
import TotalDueCard from '../uis/SaleComponents/TotalDueCard';

const SalesNew = ({ setFetchApiInfo, cartItems, setCartItems }) => {
  const classes = useStyles();
  const editableRowIndexes = ['quantity', 'discount'];
  const [searchWord, setSearchWord] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [highlightedOption, setHighlightedOption] = useState();
  const [fetchItems, setFetchItems] = useState(false);

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
  const handleSearchSubmit = (_e, value) => {
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
    }
  };
  const handleKeyDown = cell => {
    const keyDown = e => {
      if (e.key === 'Tab' && cell === 'discount') {
        document.getElementById('sale-total-inputs').focus();
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
          onChange={handleSearchSubmit}
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
        <CustomerSearch />
        <Card>
          <h1>Payment Table</h1>
        </Card>
        <TotalDueCard />
        <Card>
          <h1>Select payment type</h1>
        </Card>
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
