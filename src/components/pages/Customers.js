import React from "react";
import mockCustomers from "../../utilities/mockData/customers.json";
import { getCustomerTableHeaders } from "../../utilities/helpers/tableHelpers";
import CustomizedTable from "../uis/CustomizedTable.js";

const Customers = () => {
  const customerTableContent = () => {
    return mockCustomers.map(customer => ({
      ...customer
    }));
  };
  const customerRowKey = customer => `${customer.username}`;
  const getSelectedRows = selectedRows => {
    console.log("In Customers", selectedRows);
  };
  return (
    <CustomizedTable
      columns={getCustomerTableHeaders}
      dataSource={customerTableContent}
      rowKey={customerRowKey}
      getSelectedRows={getSelectedRows}
    />
  );
};

export default Customers;
