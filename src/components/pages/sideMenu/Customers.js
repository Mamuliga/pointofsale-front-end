import React from "react";
import { useHistory } from "react-router-dom";
import { Menu, Icon } from "antd";

const Customers = props => {
  const { location, push } = useHistory();
  return (
    <Menu
      className="side-menu"
      theme="dark"
      selectable={false}
      selectedKeys={location.pathname}
      onClick={e => push(`${location.pathname}/${e.key}`)}
    >
      <Menu.Item key="new">
        <Icon type="plus" />
        Create New
      </Menu.Item>
    </Menu>
  );
};

export default Customers;
