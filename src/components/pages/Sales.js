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

const Sales = ({ setFetchApiErr }) => {
  const editableRowIndexes = ['qty', 'discount'];
  const [searchWord, setSearchWord] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [highlightedOption, setHighlightedOption] = useState();
  const [items, setItems] = useState([]);
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
        salesPrice,
      } = value;
      items.push({
        id,
        itemName,
        salesPrice: parseFloat(salesPrice).toFixed(2),
        qty: 1,
        discount: parseFloat(0).toFixed(2),
        total: parseFloat(salesPrice).toFixed(2),
      });
    }
  };

  const tableRows = items.map((row, rowIndex) => {
    console.log(row);
    if (row.id) {
      const deleteClick = () => {
        items.splice(rowIndex, 1);
        setItems([...items]);
      };
      return (
        <TableRow hover key={`${rowIndex}+${row.id}`}>
          {Object.keys(row).map(cell => {
            row.total = parseFloat(
              row.qty * row.salesPrice - row.discount
            ).toFixed(2);
            if (editableRowIndexes.includes(cell)) {
              const handleTextInputChange = event => {
                const { value } = event.target;
                if (value >= 0) {
                  row[cell] = value;
                  setItems([...items]);
                }
              };
              const handleFocus = event => event.target.select();
              return (
                <TableCell key={cell}>
                  <TextField
                    id={cell}
                    name={cell}
                    onFocus={handleFocus}
                    autoFocus={cell === 'qty'}
                    value={row[cell]}
                    onChange={handleTextInputChange}
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
              return (
                <li
                  className={classes.searchItemSuggestionBox}
                  style={{ position: 'absolute', top: '400px' }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontWeight: 'bold',
                    }}
                  >
                    <span>{`Price : ${option.salesPrice}`}</span>
                    <span>{`Available qty : ${option.quantity}`}</span>
                    <span>
                      {`Supp. name : ${option.supplier.firstName} ${option.supplier.lastName}`}
                    </span>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-around',
                      fontWeight: 'bold',
                    }}
                  >
                    <span>{`Exp. date : ${option.expDate}`}</span>
                    <span>{`Manu. date : ${option.manuDate}`}</span>
                  </div>
                </li>
              );
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

const mapStateToProps = ({ ...global }) => {
  return { ...global };
};

const mapActionToProps = {
  setFetchApiErr: setFetchApiInfo,
};

export default connect(mapStateToProps, mapActionToProps)(Sales);
