import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import SearchIcon from '@material-ui/icons/Search';
import TableBuilder from '../uis/TableBuilder.js';
import { getReceiveTableHeaders } from '../../utilities/helpers/tableHelpers.js';
import useStyles from '../../styles/useStyles.js';
import TextField from '@material-ui/core/TextField';
import TableRow from '@material-ui/core/TableRow';
import { TableCell, CircularProgress } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { itemSearchForReceives } from '../../http/itemApi.js';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { setFetchApiInfo } from '../../store/actions/globalAction.js';
import { setCartItems } from '../../store/actions/receiveAction.js';
import { getItemTotal } from '../../utilities/helpers/receiveHelpers.js';
import DatePicker from '../uis/FormComponents/DatePicker.js';

const Receives = ({ setFetchApiInfo, cartItems, setCartItems }) => {
  console.log(cartItems);
  const editableRowIndexes = [
    'receivePrice',
    'quantity',
    'discount',
    'expiryDate',
  ];
  const [searchWord, setSearchWord] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [fetchItems, setFetchItems] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    const handleItemSearchSuccuess = resp => {
      console.log(resp.data);
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
  }, [searchWord, setFetchApiInfo]);
  const handleFocus = event => event.target.select();
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
  };
  const handleKeyDown = cell => {
    const keyDown = e => {
      if (e.key === 'Tab' && cell === 'discount') {
        document.getElementById('receive-total-inputs').focus();
      } else if (e.key === 'Enter') {
        document.getElementById('receive-item-search').focus();
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
              const handleExpDateChange = expDate => {
                row[cell] = expDate;
                setCartItems([...cartItems]);
              };
              console.log(cell);
              console.log(row[cell]);
              if (cell === 'expiryDate') {
                console.log(row[cell]);
                if (row[cell]) {
                  return (
                    <DatePicker
                      entry={{
                        id: 'id',
                        name: 'dateChangeTo',
                        label: 'To:',
                        value: 'sad',
                      }}
                      handleDatePickerChange={handleExpDateChange}
                      selectedDate={row[cell]}
                    />
                  );
                } else {
                  return (
                    <TableCell key={cell}>
                      <TextField
                        id={cell}
                        name={cell}
                        // onFocus={handleFocus}
                        // autoFocus={cell === 'receivePrice'}
                        value={'N/A'}
                        disabled
                        // onChange={handleTextInputChange}
                        // onKeyDown={handleKeyDown(cell)}
                      />
                    </TableCell>
                  );
                }
              }
              return (
                <TableCell key={cell}>
                  <TextField
                    id={cell}
                    name={cell}
                    onFocus={handleFocus}
                    autoFocus={cell === 'receivePrice'}
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
  return (
    <div>
      <div>
        <TableBuilder
          tableData={[]}
          tableHeaders={getReceiveTableHeaders}
          tableTopUis={searchComponent}
          hidePagination
          tableRows={tableRows.reverse()}
        />
      </div>
    </div>
  );
};

const mapStateToProps = ({ global, receive }) => {
  return { ...global, ...receive };
};

const mapActionToProps = {
  setFetchApiInfo,
  setCartItems,
};

export default connect(mapStateToProps, mapActionToProps)(Receives);
