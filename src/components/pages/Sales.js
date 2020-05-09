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
import { fetchApi, setFetchApiErr } from '../../store/actions/globalAction.js';

const Sales = ({ fetchApi, setFetchApiErr }) => {
  // TODO set correct values for value Arr
  const [cart, setCart] = useState([]);
  const [searchWord, setSearchWord] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [highlightedOption, setHighlightedOption] = useState({});
  const [valueArray, setValueArray] = useState([['', '', '', '', '']]);

  useEffect(() => {
    const handleItemSearchSuccuess = resp => {
      fetchApi(false);
      if (Array.isArray(resp.data)) {
        setSuggestions(resp.data);
      }
    };

    const handleItemSearchErr = err => {
      fetchApi(false);
      setFetchApiErr('Unable to search items');
      console.log(err);
    };
    fetchApi(true);
    itemSearch(searchWord)
      .then(handleItemSearchSuccuess)
      .catch(handleItemSearchErr);
  }, [fetchApi, searchWord, setFetchApiErr]);

  const handleSearchSubmit = (e, value) => {
    e.preventDefault();
    if (value) {
      const { item, id, salesPrice } = value;
      const rowIndex = cart.length;
      console.log(e.target.value);
      console.log(value);
      setValueArray([...valueArray, ['', '', '', '', '']]);
      valueArray[rowIndex][0] = id;
      valueArray[rowIndex][1] = item.itemName;
      valueArray[rowIndex][2] = salesPrice;
      valueArray[rowIndex][3] = 1;
      valueArray[rowIndex][4] = 0.0;
      setCart([
        {
          id,
          itemName: item.itemName,
          price: salesPrice,
          disc: 'male',
          quantity: '1',
          total: 'Description1',
          cartIndex: cart.length
        },
        ...cart
      ]);
    }
  };

  const handleDelete = rowIndex => {
    const deleteClick = () => {
      cart.forEach((_item, index) => {
        if (rowIndex === index) {
          setCart([...cart.splice(rowIndex, 1)]);
        }
      });
    };
    return deleteClick;
  };

  const classes = useStyles();
  const editableRowIndexes = [2, 3, 4];
  const editableRowFieldNames = ['', '', 'salesPrice', 'quantity', 'discount'];
  const tableRows = cart.map((row, rowIndex) => {
    return (
      <TableRow hover key={rowIndex}>
        {Object.values(row).map((cell, columnIndex) => {
          valueArray[rowIndex][5] =
            valueArray[rowIndex][3] * valueArray[rowIndex][2];
          if (editableRowIndexes.includes(columnIndex)) {
            const handleTextInputChange = ({ target: { name, value } }) => {
              valueArray[rowIndex][columnIndex] = value;
              setValueArray([...valueArray]);
              console.log(valueArray);
            };
            const handleFocus = event => event.target.select();
            return (
              <TableCell key={columnIndex}>
                <TextField
                  id='outlined-basic'
                  name={editableRowFieldNames[columnIndex]}
                  onFocus={handleFocus}
                  autoFocus={columnIndex === 3}
                  value={valueArray[rowIndex][columnIndex]}
                  onChange={handleTextInputChange}
                />
              </TableCell>
            );
          }
          return (
            <TableCell key={columnIndex}>
              {valueArray[rowIndex][columnIndex]}
            </TableCell>
          );
        })}
        <TableCell key={'delete'} align='right'>
          <DeleteIcon onClick={handleDelete(rowIndex)} />
        </TableCell>
      </TableRow>
    );
  });
  const { id, item, salesPrice, quantity } = highlightedOption;
  const handleSearchChange = e => {
    setSearchWord(e.target.value);
  };
  const searchComponent = (
    <div className={classes.inputsTop}>
      <div className={classes.searchTab}>
        <Autocomplete
          id='sales-item-search'
          getOptionLabel={option => option.item.itemName}
          options={suggestions}
          onChange={handleSearchSubmit}
          onHighlightChange={(event, selectedOpt, reason) => {
            setHighlightedOption(selectedOpt || {});
          }}
          loading
          renderInput={params => (
            <TextField
              autoFocus
              {...params}
              label='Enter an Item Code, Item Name or Item Id'
              variant='outlined'
              onChange={handleSearchChange}
              InputProps={{
                ...params.InputProps,
                startAdornment: <SearchIcon />,
                endAdornment: (
                  <React.Fragment>
                    {true ? (
                      // TODO
                      // Handle a local loading
                      <CircularProgress color='inherit' size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                )
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
          tableData={cart}
          tableHeaders={getSaleTableHeaders}
          tableTopUis={searchComponent}
          hidePagination
          tableRows={tableRows}
        />
      </div>
      <div
        style={{
          background: 'blue',
          height: '100px'
        }}
      >
        {console.log(highlightedOption)}
        <div>{id}</div>
        <div>{item && item.itemName}</div>
        <div>{salesPrice}</div>
        <div>{quantity}</div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ ...global }) => {
  return { ...global };
};

const mapActionToProps = {
  fetchApi,
  setFetchApiErr
};

export default connect(mapStateToProps, mapActionToProps)(Sales);
