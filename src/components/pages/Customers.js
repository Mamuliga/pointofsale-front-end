import React, { useState } from "react";
import { Table } from "antd";
import mockCustomers from "../../utilities/mockData/customers.json";
import { getCustomerTableHeaders } from "../../utilities/helpers/tableHelpers";

const Customers = () => {
  const customerTableContent = () => {
    return mockCustomers.map(customer => ({
      ...customer
    }));
  };
  const customerRowKey = customer => `${customer.username}`;
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const selectRow = record => {
    if (selectedRowKeys.indexOf(record.key) >= 0) {
      selectedRowKeys.splice(selectedRowKeys.indexOf(record.key), 1);
    } else {
      selectedRowKeys.push(record.key);
    }
    setSelectedRowKeys(selectedRowKeys);
  };

  const handleChangeRowSelection = selectedRowKeys => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: handleChangeRowSelection
  };

  const handleOnRow = record => ({
    onClick: selectRow(record)
  });

  console.log(selectedRowKeys);

  return (
    <Table
      columns={getCustomerTableHeaders()}
      dataSource={customerTableContent()}
      rowKey={customerRowKey}
      rowSelection={rowSelection}
      onRow={handleOnRow}
    />
  );
};

export default Customers;
