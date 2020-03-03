import React, { useEffect, useState } from "react";
import TableBuilder from "../uis/TableBuilder.js";
import { useHistory } from "react-router-dom";
import { getCustomerTableHeaders } from "../../utilities/helpers/tableHelpers.js";
import { getCustomerList } from "../../http/customerApi";

const Customers = () => {
  const { location, push } = useHistory();
  const [customerList, setCustomerList] = useState([]);

  useEffect(() => {
    const handleGetCustomerResp = res => {
      if (Array.isArray(res.data)) {
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
      }
    };
    const handleGetCustomerErr = err => {};

    getCustomerList()
      .then(handleGetCustomerResp)
      .catch(handleGetCustomerErr);
  }, []);

  const handleEdit = customer => {
    const editClick = () => {
      push(`${location.pathname}/edit/${customer.id}`);
    };
    return editClick;
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
      handleEdit={handleEdit}
      title={"Customers"}
    />
  );
};

export default Customers;
