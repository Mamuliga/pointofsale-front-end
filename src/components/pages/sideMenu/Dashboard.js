import React from "react";
import { useHistory } from "react-router-dom";
import { Menu, Icon } from "antd";

const Dashboard = props => {
  const { location, push } = useHistory();
  return (
    <Menu
      className="side-menu"
      theme="dark"
      selectable={false}
      selectedKeys={location.pathname}
      onClick={e => push(`${location.pathname}/${e.key}`)}
    >
      <Menu.Item key="summery">
        <Icon type="book" />
        Summery
      </Menu.Item>
    </Menu>
  );
};

export default Dashboard;
