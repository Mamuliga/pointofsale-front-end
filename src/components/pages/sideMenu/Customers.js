import React from "react";
import { useHistory } from "react-router-dom";
import { MenuItem, MenuList, Paper } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

const Customers = props => {
  const { location, push } = useHistory();
  return (
    <div>
      <Paper>
        <MenuList
          onClick={e => {
            push(`${location.pathname}/${e.key || "new"}`);
          }}
        >
          <MenuItem key='new'>
            <AddIcon /> Create New
          </MenuItem>
        </MenuList>
      </Paper>
    </div>
  );
};

export default Customers;
