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
  const [valueArray, setValueArray] = useState([
    ['id', 'itemName', 'salesPrice', 'qty', 'discount', 'total']
  ]);
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
      const rowIndex = valueArray.filter(rows => rows['id']).length;
      setValueArray([
        ...valueArray,
        ['id', 'itemName', 'salesPrice', 'qty', 'discount', 'total']
      ]);
      valueArray[rowIndex]['id'] = id;
      valueArray[rowIndex]['itemName'] = itemName;
      valueArray[rowIndex]['salesPrice'] = parseFloat(salesPrice).toFixed(2);
      valueArray[rowIndex]['qty'] = 1;
      valueArray[rowIndex]['discount'] = parseFloat(0).toFixed(2);
    }
  };

  const classes = useStyles();
  const editableRowIndexes = ['salesPrice', 'qty', 'discount'];
  const editableRowFieldNames = [
    'id',
    'itemName',
    'salesPrice',
    'qty',
    'discount'
  ];
  const tableRows = valueArray.map((row, rowIndex) => {
    console.log(row);
    if (valueArray[rowIndex]['id']) {
      const deleteClick = () => {
        valueArray.splice(rowIndex, 1);
        setValueArray([
          ...valueArray,
          ['id', 'itemName', 'salesPrice', 'qty', 'discount', 'total']
        ]);
      };
      return (
        <TableRow hover key={`${rowIndex}+${valueArray[rowIndex]['id']}`}>
          {valueArray[rowIndex].map(cell => {
            console.log(cell);
            valueArray[rowIndex]['total'] = parseFloat(
              valueArray[rowIndex]['qty'] * valueArray[rowIndex]['salesPrice']
            ).toFixed(2);
            if (editableRowIndexes.includes(cell)) {
              const handleTextInputChange = e => {
                valueArray[rowIndex][cell] = e.target.value;
                setValueArray([...valueArray]);
                console.log(valueArray);
              };
              const handleFocus = event => event.target.select();
              return (
                <TableCell key={cell}>
                  <TextField
                    id={editableRowFieldNames[cell]}
                    name={editableRowFieldNames[cell]}
                    onFocus={handleFocus}
                    autoFocus={cell === 3}
                    value={valueArray[rowIndex][cell]}
                    onChange={handleTextInputChange}
                  />
                </TableCell>
              );
            }
            return (
              <TableCell key={cell}>{valueArray[rowIndex][cell]}</TableCell>
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
