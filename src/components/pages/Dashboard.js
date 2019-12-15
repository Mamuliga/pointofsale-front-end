import React from "react";
import { Table } from 'antd';
import { DashboardTablecolumns, DashboardTabledata } from "../../utilities/helpers/tableHelpers";


const Dashboard = () => {
  return (
    <div>
      <Table columns={DashboardTablecolumns} dataSource={DashboardTabledata} />
    </div>
  );
};

export default Dashboard;
