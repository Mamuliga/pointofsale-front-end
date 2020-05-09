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
  const [cart, setCart] = useState([]);
  const [searchWord, setSearchWord] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [highlightedOption, setHighlightedOption] = useState({});
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
    if (value) {
      const { item, id /* salesPrice */ } = value;
      e.preventDefault();
      console.log(e.target.value);
      console.log(value);
      setCart([
        {
          id,
          itemName: item.itemName,
          price: 'sup1last',
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
      cart.forEach((item, index) => {
        if (rowIndex === index) {
          cart.splice(index, 1);
        }
      });
      setCart([...cart]);
    };
    return deleteClick;
  };

  const classes = useStyles();
  const editableRowIndexes = [2, 3, 4];
  const tableRows = cart.map((row, rowIndex) => {
    return (
      <TableRow hover key={row.id}>
        {Object.values(row).map((cell, index) => {
          if (editableRowIndexes.includes(index)) {
            return (
              <TableCell key={index}>
                <TextField
                  id='outlined-basic'
                  label=''
                  autoFocus={index === 4}
                />
              </TableCell>
            );
          }
          return <TableCell key={index}>{cell}</TableCell>;
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
          id='sales-item-search-'
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
