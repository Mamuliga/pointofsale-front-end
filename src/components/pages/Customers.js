import React from "react";
import mockCustomers from "../../utilities/mockData/customers.json";
import { getCustomerTableHeaders } from "../../utilities/helpers/tableHelpers";
import TableBuilder from "../uis/TableBuilder.js";

const Customers = () => {
  const customerTableContent = () => {
    return mockCustomers.map(customer => ({
      ...customer
    }));
  };
  const customerRowKey = customer => `${customer.name}`;
  const getSelectedRows = selectedRows => {
    console.log("In Customers", selectedRows);
  };
  return (
    <TableBuilder
      columns={getCustomerTableHeaders}
      dataSource={customerTableContent}
      rowKey={customerRowKey}
      getSelectedRows={getSelectedRows}
    />
  );
};

export default Customers;
