import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import useStyles from '../../../styles/useStyles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SaleToolTip from './SaleToolTip';
import { TextField, CircularProgress } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { setFetchApiInfo } from '../../../store/actions/globalAction';
import { setCartItems } from '../../../store/actions/saleActions';
import { itemSearch } from '../../../http/itemApi';

const SaleItemSearch = ({
  setFetchApiInfo,
  setCartItems,
  cartItems,
  updateDisplayTotal,
}) => {
  const classes = useStyles();
  const [suggestions, setSuggestions] = useState([]);
  const [highlightedOption, setHighlightedOption] = useState();
  const [searchWord, setSearchWord] = useState('');
  const [fetchItems, setFetchItems] = useState(false);
  const handleSearchChange = e => setSearchWord(e.target.value);

  const handleFocus = event => event.target.select();

  const handleItemSearch = () => {
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
  };

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

  useEffect(handleItemSearch, [searchWord, setFetchApiInfo]);

  return (
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
};

const mapStateToProps = ({ global, sale }) => {
  return { ...global, ...sale };
};

const mapActionToProps = {
  setFetchApiInfo,
  setCartItems,
};

export default connect(mapStateToProps, mapActionToProps)(SaleItemSearch);
