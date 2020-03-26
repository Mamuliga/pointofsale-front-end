import React, { useEffect, useState } from "react";
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
        const displaySupplierList = res.data.map(
          ({ id, firstName, lastName, phoneNo, gender, bankAccount }) => {
            return { id, firstName, lastName, phoneNo, gender, bankAccount };
          }
        );
        setSupplierList(displaySupplierList);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleEdit = supplier => {
    const editClick = () => {
      push(`${location.pathname}/edit/${supplier.id}`);
    };
    return editClick;
  };

  return (
    <TableBuilder
      tableData={supplierList}
      tableHeaders={getSupplierTableHeaders}
      handleEdit={handleEdit}
      title={"Suppliers"}
    />
  );
};

export default Suppliers;
