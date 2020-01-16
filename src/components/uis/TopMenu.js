import React from "react";
import { useHistory } from "react-router-dom";
import { Icon } from "antd";
import { TOP_MENU_ITEMS } from "../../services/routeService";
import LockIcon from "@material-ui/icons/Lock";

import MenuItem from "@material-ui/core/MenuItem";

const TopMenu = props => {
  const { push } = useHistory();

  const handleMenuClick = menuItem => {
    const menuClick = () => {
      push(menuItem.path);
    };
    return menuClick;
  };

  const handleLogoutClick = e => {
    if (typeof props.onLogoutPress === "function") {
      props.onLogoutPress();
    }
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        {TOP_MENU_ITEMS.map(menuItem => (
          <MenuItem key={menuItem.path} onClick={handleMenuClick(menuItem)}>
            {menuItem.icon}
            {menuItem.title}
          </MenuItem>
        ))}
        <MenuItem key='logout-icon' onClick={handleLogoutClick}>
          <LockIcon />
          Logout
        </MenuItem>
      </div>
    </div>
  );
};

export default TopMenu;
