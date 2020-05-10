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
import { setFetchApiErr } from '../../store/actions/globalAction.js';

const Sales = ({ setFetchApiErr }) => {
  const [searchWord, setSearchWord] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [highlightedOption, setHighlightedOption] = useState();
  const [valueArray, setValueArray] = useState([['', '', '', '', '', '']]);
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
      setFetchApiErr('Unable to search items');
      console.log(err);
    };
    setFetchItems(true);
    itemSearch(searchWord)
      .then(handleItemSearchSuccuess)
      .catch(handleItemSearchErr);
  }, [searchWord, setFetchApiErr]);

  const handleSearchSubmit = (_e, value) => {
    setHighlightedOption();
    if (value) {
      const {
        item: { id, itemName },
        salesPrice
      } = value;
      const rowIndex = valueArray.filter(rows => rows[0]).length;
      setValueArray([...valueArray, ['', '', '', '', '', '']]);
      valueArray[rowIndex][0] = id;
      valueArray[rowIndex][1] = itemName;
      valueArray[rowIndex][2] = parseFloat(salesPrice).toFixed(2);
      valueArray[rowIndex][3] = 1;
      valueArray[rowIndex][4] = parseFloat(0).toFixed(2);
    }
  };

  const classes = useStyles();
  const editableRowIndexes = [2, 3, 4];
  const editableRowFieldNames = ['', '', 'salesPrice', 'quantity', 'discount'];
  const tableRows = valueArray.map((_row, rowIndex) => {
    if (valueArray[rowIndex][0]) {
      const deleteClick = () => {
        valueArray.splice(rowIndex, 1);
        setValueArray([...valueArray, ['', '', '', '', '', '']]);
      };
      return (
        <TableRow hover key={`${rowIndex}+${valueArray[rowIndex][0]}`}>
          {valueArray[rowIndex].map((_cell, columnIndex) => {
            valueArray[rowIndex][5] = parseFloat(
              valueArray[rowIndex][3] * valueArray[rowIndex][2]
            ).toFixed(2);
            if (editableRowIndexes.includes(columnIndex)) {
              const handleTextInputChange = e => {
                valueArray[rowIndex][columnIndex] = e.target.value;
                setValueArray([...valueArray]);
                console.log(valueArray);
              };
              const handleFocus = event => event.target.select();
              return (
                <TableCell key={columnIndex}>
                  <TextField
                    id={editableRowFieldNames[columnIndex]}
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
            <DeleteIcon onClick={deleteClick} />
          </TableCell>
        </TableRow>
      );
    }
    return null;
  });
  const handleSearchChange = e => {
    setSearchWord(e.target.value);
  };
  const searchComponent = (
    <div className={classes.inputsTop}>
      <div className={classes.searchTab}>
        <Autocomplete
          id='sales-item-search'
          getOptionLabel={option => `${option.item.id}-${option.item.itemName}`}
          options={suggestions}
          onChange={handleSearchSubmit}
          onHighlightChange={(_event, selectedOpt) => {
            setHighlightedOption(selectedOpt);
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
                    {fetchItems && (
                      <CircularProgress color='inherit' size={20} />
                    )}
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
          tableData={[]}
          tableHeaders={getSaleTableHeaders}
          tableTopUis={searchComponent}
          hidePagination
          tableRows={tableRows}
        />
      </div>
      {highlightedOption && (
        <div className={classes.searchItemSuggestionBox}>
          {console.log(highlightedOption)}
          <h3>Name : {highlightedOption.item.itemName}</h3>
          <h3>Price : {highlightedOption.salesPrice}</h3>
          <h3>Quantity : {highlightedOption.quantity}</h3>
          <h3>Exp date : {highlightedOption.expDate}</h3>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ ...global }) => {
  return { ...global };
};

const mapActionToProps = {
  setFetchApiErr
};

export default connect(mapStateToProps, mapActionToProps)(Sales);
