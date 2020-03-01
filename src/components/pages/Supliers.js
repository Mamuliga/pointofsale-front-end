import React, { useEffect, useState } from "react";
// import mockCustomers from "../../utilities/mockData/customers.json";
import TableBuilder from "../uis/TableBuilder.js";
import { useHistory } from "react-router-dom";
import { getSuplierTableHeaders } from "../../utilities/helpers/tableHelpers.js";
import { getSuplierList } from "../../http/suplierApi";

const Supliers = () => {
  const { location, push } = useHistory();
  const [suplierList, setSuplierList] = useState([]);

  useEffect(() => {
    getSuplierList()
      .then(res => {
        console.log(res);
        const displaySuplierList = res.data.map(suplier =>
          createSuplierData(
            suplier.id,
            suplier.firstName,
            suplier.lastName,
            suplier.phoneNo,
            suplier.gender,
            suplier.bankAccount
          )
        );
        setSuplierList(displaySuplierList);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleRowClick = suplier => {
    const rowClick = () => {
      push(`${location.pathname}/edit/${suplier.id}`);
    };
    return rowClick;
  };

  function createSuplierData(
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
      tableData={suplierList}
      tableHeaders={getSuplierTableHeaders}
      onRowClick={handleRowClick}
      title={"Supliers"}
    />
  );
};

export default Supliers;
