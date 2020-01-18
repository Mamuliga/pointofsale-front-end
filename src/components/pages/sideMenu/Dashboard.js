import React from "react";
import { useHistory } from "react-router-dom";
import { Paper, MenuList, MenuItem } from "@material-ui/core";
import MenuBookIcon from "@material-ui/icons/MenuBook";

const Dashboard = props => {
  const { location, push } = useHistory();
  return (
    <div>
      <Paper>
        <MenuList
          onClick={e => {
            push(`${location.pathname}/${e.key || "summary"}`);
          }}
        >
          <MenuItem key='new'>
            <MenuBookIcon /> Summary
          </MenuItem>
        </MenuList>
      </Paper>
    </div>
  );
};

export default Dashboard;
