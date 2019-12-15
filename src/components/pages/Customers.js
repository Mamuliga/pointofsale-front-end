import React from "react";
import { Table } from "antd";
import mockCustomers from "../../utilities/mockData/customers.json";
import { getCustomerTableHeaders, CustomersTablecolumns, CustomersTabledata } from "../../utilities/helpers/tableHelpers";

const Customers = () => {
  const customerTableContent = () => {
    return mockCustomers.map(customer => ({
      ...customer
    }));
  };

  const customerRowKey = customer => `${customer.username}`;

  return (
    <Table columns={CustomersTablecolumns} dataSource={CustomersTabledata} />
  );
};

export default Customers;
