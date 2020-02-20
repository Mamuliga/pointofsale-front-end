import React, { useEffect, useState } from "react";
// import mockCustomers from "../../utilities/mockData/customers.json";
import TableBuilder from "../uis/TableBuilder.js";
import { useHistory } from "react-router-dom";
import { getCustomerTableHeaders } from "../../utilities/helpers/tableHelpers.js";
import { getCustomerList } from "../../http/customerApi";

const Customers = () => {
  const { location, push } = useHistory();
  const [customerList, setCustomerList] = useState([]);

  useEffect(() => {
    console.log("In use effect");
    getAllCustomerList(createCustomerData, setCustomerList);
  }, []);

  const handleRowClick = customer => {
    const rowClick = () => {
      push(`${location.pathname}/edit/${customer.id}`);
    };
    return rowClick;
  };

  function createCustomerData(
    id,
    firstName,
    lastName,
    phoneNo,
    gender,
    bankAccount
  ) {
    return { id, firstName, lastName, phoneNo, gender, bankAccount };
  }
  return (
    <TableBuilder
      tableData={customerList}
      tableHeaders={getCustomerTableHeaders}
      onRowClick={handleRowClick}
      title={"Customers"}
    />
  );
};

export default Customers;
function getAllCustomerList(createCustomerData, setCustomerList) {
  getCustomerList()
    .then(res => {
      console.log(res);
      const displayCustomerList = res.data.map(customer =>
        createCustomerData(
          customer.id,
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
}
