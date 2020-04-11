import React, { useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import TableBuilder from "../uis/TableBuilder.js";
// import { useHistory } from "react-router-dom";
import { getSaleList } from "../../http/saleApi";
import { getSaleTableHeaders } from "../../utilities/helpers/tableHelpers.js";
import useStyles from "../../styles/useStyles.js";
import TextField from "@material-ui/core/TextField";
import TableRow from "@material-ui/core/TableRow";
import { TableCell } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";

const Sales = () => {
  // const { location, push } = useHistory();
  const [saleList, setSaleList] = useState([]);

  useEffect(() => {
    getSaleList()
      .then(res => {
        console.log(res);
        const displaySaleList = res.data.map(
          ({ id, ItemName, Price, Disc, Quantity, Total }) => {
            return { id, ItemName, Price, Disc, Quantity, Total };
          }
        );
        setSaleList(displaySaleList);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleSearchSubmit = e => {
    e.preventDefault();
    setSaleList([
      {
        id: 1,
        itemName: "sup1",
        price: "sup1last",
        disc: "male",
        quantity: "1",
        total: "Description1"
      }
    ]);
  };

  const editableRowIndexes = [2, 3, 4];

  const handleDelete = sale => {
    const deleteClick = () => {
      // push(`${location.pathname}/delete/${sale.id}`);
      setSaleList([]);
    };
    return deleteClick;
  };
  const classes = useStyles();

  const tableRows = saleList.map(row => {
    return (
      <TableRow hover tabIndex={-1} key={row.id}>
        {Object.values(row).map((cell, index) => {
          if (editableRowIndexes.includes(index)) {
            return (
              <TableCell key={index}>
                <TextField id='outlined-basic' label='' variant='outlined' />
              </TableCell>
            );
          }
          return <TableCell key={index}>{cell}</TableCell>;
        })}
        <TableCell key={"delete"} align='right'>
          <DeleteIcon onClick={handleDelete(row)} />
        </TableCell>
      </TableRow>
    );
  });

  const searchComponent = (
    <div className={classes.inputsTop}>
      <form onSubmit={handleSearchSubmit}>
        <div className={classes.searchTab}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <div className={classes.search}>
            <TextField
              autoFocus
              placeholder='Search…'
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ "aria-label": "search" }}
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
          tableData={saleList}
          tableHeaders={getSaleTableHeaders}
          tableTopUis={searchComponent}
          hidePagination
          tableRows={tableRows}
        />
      </div>
      <Button className={classes.button} variant='contained' color='primary'>
        Submit
      </Button>
    </div>
  );
};

export default Sales;
