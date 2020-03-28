import React, { useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import TableBuilder from "../uis/TableBuilder.js";
import { useHistory } from "react-router-dom";
import { getSaleList } from "../../http/saleApi";
import { getSaleTableHeaders } from "../../utilities/helpers/tableHelpers.js";
import useStyles from "../../styles/useStyles.js";

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
      push(`${location.pathname}/edit/${sale.id}`);
    };
    return editClick;
  };
  const classes = useStyles();

  const searchComponent = (
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
  );
  return (
    <div>
      <TableBuilder
        tableData={saleList}
        tableHeaders={getSaleTableHeaders}
        handleEdit={handleEdit}
        tableTopUIs={searchComponent}
        title={"Sales"}
      />
    </div>
  );
};

export default Sales;
