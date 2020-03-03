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
        const displayCustomerList = res.data.map(customer => {
          const {
            id,
            firstName,
            lastName,
            phoneNo,
            gender,
            bankAccount
          } = customer;
          return { id, firstName, lastName, phoneNo, gender, bankAccount };
        });
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
