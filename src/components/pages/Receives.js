import React, { useEffect, useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import TableBuilder from '../uis/TableBuilder.js';
// import { useHistory } from "react-router-dom";
import { getReceiveList } from '../../http/receiveApi';
import { getReceiveTableHeaders } from '../../utilities/helpers/tableHelpers.js';
import useStyles from '../../styles/useStyles.js';
import TextField from '@material-ui/core/TextField';
import TableRow from '@material-ui/core/TableRow';
import { TableCell } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const Receives = () => {
  // const { location, push } = useHistory();
  const [ReceiveList, setReceiveList] = useState([]);

  useEffect(() => {
    getReceiveList()
      .then(res => {
        console.log(res);
        const displayReceiveList = res.data.map(
          ({ id, ItemName, Price, Disc, Quantity, Total }) => {
            return { id, ItemName, Price, Disc, Quantity, Total };
          }
        );
        setReceiveList(displayReceiveList);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleSearchSubmit = e => {
    e.preventDefault();
    setReceiveList([
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

  const handleDelete = receive => {
    const deleteClick = () => {
      // push(`${location.pathname}/delete/${receive.id}`);
      setReceiveList([]);
    };
    return deleteClick;
  };
  const classes = useStyles();
  const editableRowIndexes = [2, 3, 4];
  const tableRows = ReceiveList.map(row => {
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

  const searchComponent = (
    <div className={classes.inputsTop}>
      <form onSubmit={handleSearchSubmit} className={classes.searchForm}>
        <div className={classes.searchTab}>
          <div className={classes.searchField}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <TextField
              autoFocus
              placeholder='Search…'
              classes={{
                root: classes.searchInputRoot,
                input: classes.searchInput
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </div>
      </form>
    </div>
  );

  return (
    <div>
      <div>
        <TableBuilder
          tableData={ReceiveList}
          tableHeaders={getReceiveTableHeaders}
          tableTopUis={searchComponent}
          hidePagination
          tableRows={tableRows}
        />
      </div>
    </div>
  );
};

export default Receives;
