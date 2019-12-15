import React from "react";
import { Table } from 'antd';
import { columns, data, DashboardTablecolumns, DashboardTabledata } from "../../utilities/helpers/tableHelpers";
import Column from "antd/lib/table/Column";


const Dashboard = () => {
  return (
    <div>
      <Table columns={DashboardTablecolumns} dataSource={DashboardTabledata} />
    </div>
  );
};

export default Dashboard;
