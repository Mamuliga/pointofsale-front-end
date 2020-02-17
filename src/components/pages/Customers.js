import React, { useEffect, useState } from "react";
// import mockCustomers from "../../utilities/mockData/customers.json";
import TableBuilder from "../uis/TableBuilder.js";
import { getCustomerTableHeaders } from "../../utilities/helpers/tableHelpers.js";
import {
  getCustomerList,
  getCustomerById,
  updateCustomerById
} from "../../http/customerApi";
import FormCustomer from "./FormCustomer.js";
import { getCustomerFormData } from "../../utilities/helpers/formHelpers/customerForm";

const Customers = () => {
  const [customerList, setCustomerList] = useState([]);
  const [editView, setEditView] = useState(false);
  const [customer, setCustomer] = useState({});
  const [dataWithValue, setDataWithValue] = useState([]);

  useEffect(() => {
    console.log("In use effect");
    getAllCustomerList(createCustomerData, setCustomerList);
  }, []);

  const customerRowKey = customer => `${customer.firstName}`;
  const getSelectedRows = selectedRows => {
    console.log("In Customers", selectedRows);
  };

  const handleFormSubmit = updatedCustomer => {
    const formSubmit = () => {
      updateCustomerById(updatedCustomer.id, updatedCustomer)
        .then(res => {
          console.log(res.data);
          setCustomer(updatedCustomer);
          setEditView(!editView);
          getAllCustomerList(createCustomerData, setCustomerList);
        })
        .catch(err => {
          console.log(err);
        });
    };
    return formSubmit;
  };

  const handleRowClick = customer => {
    const rowClick = () => {
      const data = getCustomerFormData;
      const dataArray = [];

      getCustomerById(customer.id)
        .then(res => {
          const newCustomer = res.data;
          Object.keys(res.data).forEach(id => {
            data.forEach(entry => {
              if (id === entry.id) {
                dataArray.push({ ...entry, value: newCustomer[`${id}`] });
              }
              return null;
            });
          });
          setCustomer(newCustomer);
          setDataWithValue([...dataArray]);
          setEditView(!editView);
        })
        .catch(err => {
          console.err(err);
        });
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
  if (editView) {
    return (
      <FormCustomer
        onClick={handleFormSubmit}
        customer={customer}
        data={dataWithValue}
      />
    );
  }
  return (
    <TableBuilder
      rowKey={customerRowKey}
      getSelectedRows={getSelectedRows}
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
