import React, { useEffect, useState } from "react";
import TableBuilder from "../uis/TableBuilder.js";
import { useHistory } from "react-router-dom";
import { getEmployeeTableHeaders } from "../../utilities/helpers/tableHelpers.js";
import { getEmployeeList } from "../../http/employeeApi";

const Employees = () => {
  const { location, push } = useHistory();
  const [employeeList, setEmployeeList] = useState([]);

  useEffect(() => {
    const handleGetEmployeeResp = res => {
      if (Array.isArray(res.data)) {
        const displayEmployeeList = res.data.map(employee => {
          const {
            id,
            firstName,
            lastName,
            phoneNo,
            gender,
            bankAccount
          } = employee;
          return { id, firstName, lastName, phoneNo, gender, bankAccount };
        });
        setEmployeeList(displayEmployeeList);
      }
    };
    const handleGetEmployeeErr = err => {};

    getEmployeeList()
      .then(handleGetEmployeeResp)
      .catch(handleGetEmployeeErr);
  }, []);

  const handleEdit = employee => {
    const editClick = () => {
      push(`${location.pathname}/edit/${employee.id}`);
    };
    return editClick;
  };

  return (
    <TableBuilder
      tableData={employeeList}
      tableHeaders={getEmployeeTableHeaders}
      handleEdit={handleEdit}
      title={"Employees"}
    />
  );
};

export default Employees;
