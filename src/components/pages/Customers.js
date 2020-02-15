import React, { useEffect, useState } from "react";
// import mockCustomers from "../../utilities/mockData/customers.json";
import TableBuilder from "../uis/TableBuilder.js";
import { getCustomerTableHeaders } from "../../utilities/helpers/tableHelpers.js";
import { getCustomerList } from "../../http/usersApi.js";

const Customers = () => {
  const [customerList, setCustomerList] = useState([]);
  useEffect(() => {
    console.log("In use effect");
    getCustomerList()
      .then(res => {
        console.log(res);
        const displayCustomerList = res.data.map(customer =>
          createCustomerData(
            customer.firstName,
            customer.lastName,
            customer.phoneNo,
            customer.gender,
            customer.bankAccount
          )
        );
        setCustomerList(displayCustomerList);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const customerRowKey = customer => `${customer.firstName}`;
  const getSelectedRows = selectedRows => {
    console.log("In Customers", selectedRows);
  };

  function createCustomerData(
    firstName,
    lastName,
    phoneNo,
    gender,
    bankAccount
  ) {
    return { firstName, lastName, phoneNo, gender, bankAccount };
  }
  return (
    <TableBuilder
      rowKey={customerRowKey}
      getSelectedRows={getSelectedRows}
      tableData={customerList}
      tableHeaders={getCustomerTableHeaders}
    />
  );
};

export default Customers;
