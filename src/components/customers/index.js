import React from "react";
import { Table } from "antd";
import mockCustomers from "../../utilities/mockData/customers.json";
import { getCustomerTableHeaders } from "../../utilities/helpers/tableHelpers";

const Customers = () => {
  return (
    <Table columns={getCustomerTableHeaders()} dataSource={mockCustomers} />
  );
};

export default Customers;
