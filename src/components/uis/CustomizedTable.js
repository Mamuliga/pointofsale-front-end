import React, { useState, useRef } from "react";
import { Table, Icon, Button, Input, Checkbox } from "antd";
import Highlighter from "react-highlight-words";

const CustomizedTable = ({
  columns,
  dataSource,
  rowKey,
  getSelectedRows,
  noOfItemsPerPage
}) => {
  const searchInput = useRef();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [searchText, setSearchedText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [showColumnFilter, setColumnFilter] = useState(false);
  const [headerTitles, setHeaderTitles] = useState([]);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    if (typeof confirm === "function") {
      confirm();
    }
    if (Array.isArray(selectedKeys)) {
      setSearchedText(selectedKeys[0]);
    }
    setSearchedColumn(dataIndex);
  };

  const handleReset = clearFilters => {
    if (typeof clearFilters === "function") {
      clearFilters();
    }
    setSearchedText("");
  };

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.current.focus());
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      )
  });

  const [tableHeaders, setTableHeaders] = useState(
    columns(getColumnSearchProps)
  );

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

  const handleIconClick = () => {
    if (headerTitles.length === 0) {
      const headers = tableHeaders.map(columnObj => columnObj.title);
      setHeaderTitles(headers.filter(header => header));
    }
    setTableHeaders(columns(getColumnSearchProps));
    setColumnFilter(!showColumnFilter);
  };

  const handleColumnFilter = selectedColumns => {
    const tableHeaders = columns(getColumnSearchProps);
    const filteredTableHeaders = tableHeaders.filter(header =>
      selectedColumns.includes(header.title)
    );
    setTableHeaders(filteredTableHeaders);
  };
  return (
    <React.Fragment>
      <div className="customizedTable-column-filter">
        <div onClick={handleIconClick} className="column-filter-icon">
          <Icon type="filter" onClick={handleIconClick} />
          Filter columns
        </div>
        {showColumnFilter && (
          <Checkbox.Group
            options={headerTitles}
            onChange={handleColumnFilter}
            defaultValue={headerTitles}
          />
        )}
      </div>
      <Table
        columns={tableHeaders}
        dataSource={dataSource()}
        rowKey={rowKey}
        rowSelection={rowSelection}
        onRow={handleOnRow}
        pagination={{
          pageSize: noOfItemsPerPage || 10
        }}
      />
    </React.Fragment>
  );
};

export default CustomizedTable;
