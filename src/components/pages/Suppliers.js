import React, { useEffect, useState } from "react";
// import mockCustomers from "../../utilities/mockData/customers.json";
import TableBuilder from "../uis/TableBuilder.js";
import { useHistory } from "react-router-dom";
import { getSupplierTableHeaders } from "../../utilities/helpers/tableHelpers.js";
import { getSupplierList } from "../../http/supplierApi";

const Suppliers = () => {
  const { location, push } = useHistory();
  const [supplierList, setSupplierList] = useState([]);

  useEffect(() => {
    getSupplierList()
      .then(res => {
        console.log(res);
        const displaySupplierList = res.data.map(supplier =>
          createSupplierData(
            supplier.id,
            supplier.firstName,
            supplier.lastName,
            supplier.phoneNo,
            supplier.gender,
            supplier.bankAccount
          )
        );
        setSupplierList(displaySupplierList);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleRowClick = supplier => {
    const rowClick = () => {
      push(`${location.pathname}/edit/${supplier.id}`);
    };
    return rowClick;
  };

  function createSupplierData(
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
      tableData={supplierList}
      tableHeaders={getSupplierTableHeaders}
      onRowClick={handleRowClick}
      title={"Suppliers"}
    />
  );
};

export default Suppliers;
