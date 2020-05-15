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
  const columnArray = [
    'id',
    'itemName',
    'salesPrice',
    'qty',
    'discount',
    'total'
  ];
  const editableRowIndexes = ['salesPrice', 'qty', 'discount'];
  const [searchWord, setSearchWord] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [highlightedOption, setHighlightedOption] = useState();
  const [rowArray, setRowArray] = useState([columnArray]);
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
        salesPrice
      } = value;
      const rowIndex = rowArray.filter(rows => rows['id']).length;
      setRowArray([...rowArray, columnArray]);
      rowArray[rowIndex]['id'] = id;
      rowArray[rowIndex]['itemName'] = itemName;
      rowArray[rowIndex]['salesPrice'] = parseFloat(salesPrice).toFixed(2);
      rowArray[rowIndex]['qty'] = 1;
      rowArray[rowIndex]['discount'] = parseFloat(0).toFixed(2);
    }
  };

  const tableRows = rowArray.map((row, rowIndex) => {
    console.log(row);
    if (rowArray[rowIndex]['id']) {
      const deleteClick = () => {
        rowArray.splice(rowIndex, 1);
        setRowArray([...rowArray, columnArray]);
      };
      return (
        <TableRow hover key={`${rowIndex}+${rowArray[rowIndex]['id']}`}>
          {rowArray[rowIndex].map(cell => {
            rowArray[rowIndex]['total'] = parseFloat(
              rowArray[rowIndex]['qty'] * rowArray[rowIndex]['salesPrice'] -
                rowArray[rowIndex]['discount']
            ).toFixed(2);
            if (editableRowIndexes.includes(cell)) {
              const handleTextInputChange = event => {
                const { name, value } = event.target;
                console.log(name);
                console.log(value);
                console.log(columnArray);
                //TODO Set min validations for discount
                // const minAmount =
                //   name === 'discount' && rowArray[rowIndex]['salesPrice'];
                // console.log(minAmount);
                if (value >= 0) {
                  // if (!minAmount) {
                  //   rowArray[rowIndex][cell] = value;
                  //   setRowArray([...rowArray]);
                  // } else if (value <= minAmount) {
                  rowArray[rowIndex][cell] = value;
                  setRowArray([...rowArray]);
                  // } else {
                  // setRowArray([...rowArray]);
                  // }
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
                    value={rowArray[rowIndex][cell]}
                    onChange={handleTextInputChange}
                  />
                </TableCell>
              );
            }
            return <TableCell key={cell}>{rowArray[rowIndex][cell]}</TableCell>;
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
                <li className={classes.searchItemSuggestionBox}>
                  <span style={{ fontWeight: 'bold', marginRight: '3em' }}>
                    {`Price : ${option.salesPrice}`}
                  </span>
                  <span style={{ fontWeight: 'bold', marginRight: '3em' }}>
                    {`Available qty : ${option.quantity}`}
                  </span>
                  <span style={{ fontWeight: 'bold', marginRight: '3em' }}>
                    {`Exp. date : ${option.expDate}`}
                  </span>
                  <span style={{ fontWeight: 'bold', marginRight: '3em' }}>
                    {`Manu. date : ${option.manuDate}`}
                  </span>
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
  setFetchApiErr: setFetchApiInfo
};

export default connect(mapStateToProps, mapActionToProps)(Sales);
