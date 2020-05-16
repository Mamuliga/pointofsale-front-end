import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import SearchIcon from '@material-ui/icons/Search';
import TableBuilder from '../uis/TableBuilder.js';
import { getSaleTableHeaders } from '../../utilities/helpers/tableHelpers.js';
import useStyles from '../../styles/useStyles.js';
import TextField from '@material-ui/core/TextField';
import TableRow from '@material-ui/core/TableRow';
import { TableCell, CircularProgress } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { itemSearch } from '../../http/itemApi.js';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { setFetchApiInfo } from '../../store/actions/globalAction.js';
import { setCartItems } from '../../store/actions/saleActions.js';
import { getItemTotal } from '../../utilities/helpers/saleHelpers.js';
import SaleToolTip from '../uis/SaleComponents/SaleToolTip.js';

const Sales = ({ setFetchApiInfo, cartItems, setCartItems }) => {
  console.log(cartItems);
  const editableRowIndexes = ['quantity', 'discount'];
  const [searchWord, setSearchWord] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [highlightedOption, setHighlightedOption] = useState();
  const [fetchItems, setFetchItems] = useState(false);
  const classes = useStyles();

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
      } = value;
      cartItems.push({
        id,
        itemName,
        salesPrice: parseFloat(salesPrice).toFixed(2),
        quantity: 1,
        discount: parseFloat(0).toFixed(2),
        total: parseFloat(salesPrice).toFixed(2),
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
              variant='outlined'
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
    <div>
      <div>
        <TableBuilder
          tableData={[]}
          tableHeaders={getSaleTableHeaders}
          tableTopUis={searchComponent}
          hidePagination
          tableRows={tableRows.reverse()}
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

export default connect(mapStateToProps, mapActionToProps)(Sales);
