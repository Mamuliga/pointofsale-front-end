import React, { useEffect, useState } from "react";
import TableBuilder from "../uis/TableBuilder.js";
import { useHistory } from "react-router-dom";
import { getEmployeeTableHeaders } from "../../utilities/helpers/tableHelpers.js";
import { getEmployeeList } from "../../http/employeeApi";

const Employee = () => {
  const { location, push } = useHistory();
  const [employeeList, setEmployeeList] = useState([]);

  useEffect(() => {
    getEmployeeList()
      .then(res => {
        console.log(res);
        const displayEmployeeList = res.data.map(employee =>
          createEmployeeData(
            employee.id,
            employee.firstName,
            employee.lastName,
            employee.phoneNo,
            employee.gender,
            employee.bankAccount
          )
        );
        setEmployeeList(displayEmployeeList);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleRowClick = employee => {
    const rowClick = () => {
      push(`${location.pathname}/edit/${employee.id}`);
    };
    return rowClick;
  };

  function createEmployeeData(
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
      tableData={employeeList}
      tableHeaders={getEmployeeTableHeaders}
      onRowClick={handleRowClick}
      title={"Employee"}
    />
  );
};

export default Employee;
