import React from "react";
import { useHistory } from "react-router-dom";
import { Menu, Icon } from "antd";
import { TOP_MENU_ITEMS } from "../../services/routeService";

const TopMenu = props => {
  const { push } = useHistory();

  const handleMenuClick = e => {
    if (e.key.indexOf("null") === -1) {
      push(e.key);
    }
  };

  const handleLogoutClick = e => {
    if (typeof props.onLogoutPress === "function") {
      props.onLogoutPress();
    }
  };

  return (
    <Menu
      onClick={handleMenuClick}
      selectedKeys={props.selectedKey}
      selectable={false}
      mode="horizontal"
      theme="dark"
      multiple={false}
      style={{ display: "flex" }}
    >
      {TOP_MENU_ITEMS.map(menuItem => (
        <Menu.Item key={menuItem.path}>
          <Icon type={menuItem.icon} />
          {menuItem.title}
        </Menu.Item>
      ))}

      <Menu.Item key="null" className="right-menu-item" />

      {/* Right menu Items go here */}
      <Menu.Item key={"logout-null"} onClick={handleLogoutClick}>
        <Icon type="logout" />
        Logout
      </Menu.Item>
    </Menu>
  );
};

export default TopMenu;
