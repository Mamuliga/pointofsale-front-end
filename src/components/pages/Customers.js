import React from "react";
import mockCustomers from "../../utilities/mockData/customers.json";
import TableBuilder from "../uis/TableBuilder.js";
import { getCustomerTableHeaders } from "../../utilities/helpers/tableHelpers.js";

const Customers = () => {
  const customerRowKey = customer => `${customer.username}`;
  const getSelectedRows = selectedRows => {
    console.log("In Customers", selectedRows);
  };
  const customerTableContent = () => {
    return mockCustomers.map(customer =>
      createCustomerData(
        customer.isActive ? "Active" : "Inactive",
        customer.firstName,
        customer.lastName,
        customer.username,
        customer.outstanding
      )
    );
  };

  function createCustomerData(
    isActive,
    firstName,
    lastName,
    username,
    outstanding
  ) {
    return { isActive, firstName, lastName, username, outstanding };
  }
  return (
    <TableBuilder
      rowKey={customerRowKey}
      getSelectedRows={getSelectedRows}
      tableData={customerTableContent()}
      tableHeaders={getCustomerTableHeaders}
    />
  );
};

export default Customers;
