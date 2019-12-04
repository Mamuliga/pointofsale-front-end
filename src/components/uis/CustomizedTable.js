import React, { useState } from "react";
import { Table } from "antd";

const CustomizedTable = ({ columns, dataSource, rowKey, getSelectedRows }) => {
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
    getSelectedRows(selectedRowKeys);
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
      columns={columns}
      dataSource={dataSource}
      rowKey={rowKey}
      rowSelection={rowSelection}
      onRow={handleOnRow}
    />
  );
};

export default CustomizedTable;
