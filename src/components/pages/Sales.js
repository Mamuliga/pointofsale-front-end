import React, { useEffect, useState } from 'react';
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

const Sales = () => {
  const [saleList, setSaleList] = useState([]);
  const [searchWord, setSearchWord] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const handleItemSearchSuccuess = resp => {
      console.log(resp);
      if (Array.isArray(resp.data)) {
        setSuggestions(resp.data);
      }
    };

    const handleItemSearchErr = err => {
      console.log(err);
    };
    itemSearch(searchWord)
      .then(handleItemSearchSuccuess)
      .catch(handleItemSearchErr);
  }, [searchWord]);

  const handleSearchSubmit = e => {
    e.preventDefault();
    setSaleList([
      {
        id: 1,
        itemName: 'sup1',
        price: 'sup1last',
        disc: 'male',
        quantity: '1',
        total: 'Description1'
      }
    ]);
  };

  const handleDelete = sale => {
    const deleteClick = () => {
      setSaleList([]);
    };
    return deleteClick;
  };

  const classes = useStyles();
  const editableRowIndexes = [2, 3, 4];
  const tableRows = saleList.map(row => {
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
          <DeleteIcon onClick={handleDelete(row)} />
        </TableCell>
      </TableRow>
    );
  });

  const handleSearchChange = e => {
    setSearchWord(e.target.value);
  };
  const searchComponent = (
    <div className={classes.inputsTop}>
      <form onSubmit={handleSearchSubmit} className={classes.searchForm}>
        <div className={classes.searchTab}>
          <Autocomplete
            id='sales-item-search-'
            getOptionLabel={option => option.item.itemName}
            options={suggestions}
            onHighlightChange={(event, selectedOpt, reason) => {
              console.log(event);
              console.log(selectedOpt);
              console.log(reason);
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
                      {/* loading */ true ? (
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
      </form>
    </div>
  );
  return (
    <div>
      <div>
        <TableBuilder
          tableData={saleList}
          tableHeaders={getSaleTableHeaders}
          tableTopUis={searchComponent}
          hidePagination
          tableRows={tableRows}
        />
      </div>
    </div>
  );
};

export default Sales;
