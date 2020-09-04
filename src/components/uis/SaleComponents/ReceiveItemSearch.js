import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import useStyles from '../../../styles/useStyles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField, CircularProgress } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { setFetchApiInfo } from '../../../store/actions/globalAction';
import { itemSearchForReceives } from '../../../http/itemApi';

const ReceiveItemSearch = ({
  setFetchApiInfo,
  setCartItems,
  cartItems,
  updateDisplayTotal,
}) => {
  const classes = useStyles();
  const [suggestions, setSuggestions] = useState([]);
  const [searchWord, setSearchWord] = useState('');
  const [fetchItems, setFetchItems] = useState(false);
  const handleSearchChange = e => setSearchWord(e.target.value);

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
    itemSearchForReceives(searchWord)
      .then(handleItemSearchSuccuess)
      .catch(handleItemSearchErr);
  };

  const handleSearchSubmit = (_e, value) => {
    if (value) {
      const { id, itemName, isExpireDateEnabled } = value;
      cartItems.push({
        id,
        itemName,
        receivePrice: parseFloat(0).toFixed(2),
        quantity: 1,
        expiryDate: isExpireDateEnabled,
        discount: parseFloat(0).toFixed(2),
        total: parseFloat(0).toFixed(2),
      });
      setCartItems([...cartItems]);
    }
    updateDisplayTotal();
  };

  useEffect(handleItemSearch, [searchWord, setFetchApiInfo]);

  return (
    <div className={classes.inputsTop}>
      <div className={classes.searchTab}>
        <Autocomplete
          id='receive-item-search'
          getOptionLabel={option => option.itemName}
          options={suggestions}
          onChange={handleSearchSubmit}
          loading={fetchItems}
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
};

const mapStateToProps = ({ global, sale }) => {
  return { ...global, ...sale };
};

const mapActionToProps = {
  setFetchApiInfo,
};

export default connect(mapStateToProps, mapActionToProps)(ReceiveItemSearch);
