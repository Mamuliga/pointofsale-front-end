import React, { useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import TableBuilder from "../uis/TableBuilder.js";
import { useHistory } from "react-router-dom";
import { getSaleList } from "../../http/saleApi";
import { getSaleTableHeaders } from "../../utilities/helpers/tableHelpers.js";
import useStyles from "../../styles/useStyles.js";
import TextField from "@material-ui/core/TextField";

const Sales = () => {
  const { location, push } = useHistory();
  const [saleList, setSaleList] = useState([]);

  useEffect(() => {
    getSaleList()
      .then(res => {
        console.log(res);
        const displaySaleList = res.data.map(
          ({ id, ItemName, Price, Quantity, Disc, Total, Update }) => {
            return { id, ItemName, Price, Quantity, Disc, Total, Update };
          }
        );
        setSaleList(displaySaleList);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleEdit = sale => {
    const editClick = () => {
      push(`${location.pathname}/delete/${sale.id}`);
    };
    return editClick;
  };
  const classes = useStyles();
  const searchComponent = (
    <div className={classes.inputsTop}>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder='Search…'
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput
          }}
          inputProps={{ "aria-label": "search" }}
        />
      </div>
      <div className={classes.customerName}>
        <TextField
          id='outlined-textarea'
          label='Customer Name'
          multiline
          variant='outlined'
        />
      </div>
    </div>
  );

  return (
    <div>
      <div>
        <TableBuilder
          tableData={saleList}
          tableHeaders={getSaleTableHeaders}
          handleEdit={handleEdit}
          tableTopUis={searchComponent}
          title={"Sales"}
        />
      </div>
      <div>
        <div className={classes.total}>
          <TextField
            id='outlined-textarea'
            label='Total'
            multiline
            variant='outlined'
          />
        </div>

        <div className={classes.cash}>
          <TextField
            id='outlined-textarea'
            label='Cash'
            multiline
            variant='outlined'
          />
        </div>
        <div className={classes.balance}>
          <TextField
            id='outlined-textarea'
            label='Balance'
            multiline
            variant='outlined'
          />
        </div>
      </div>
    </div>
  );
};

export default Sales;
