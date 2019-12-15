import React from "react";
import { Table } from "antd";
import { CustomersTablecolumns, CustomersTabledata } from "../../utilities/helpers/tableHelpers";

const Customers = () => {
  return (
    <Table columns={CustomersTablecolumns} dataSource={CustomersTabledata} />
  );
};

export default Customers;
