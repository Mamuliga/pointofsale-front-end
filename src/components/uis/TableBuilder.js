import React, { useState, useRef } from "react";
import { Table, Icon, Button, Input, Checkbox } from "antd";
import Highlighter from "react-highlight-words";

const TableBuilder = ({
  columns,
  dataSource,
  rowKey,
  getSelectedRows,
  noOfItemsPerPage
}) => {
  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => {
      const handleSearchInputChange = e =>
        setSelectedKeys(e.target.value ? e.target.value.split(" ") : []);

      const handleSearchFunc = (selectedKeys, confirm, dataIndex) => {
        const handleSearch = () => {
          if (typeof confirm === "function") {
            confirm();
          }
          if (Array.isArray(selectedKeys)) {
            setSearchText(selectedKeys[0]);
          }
          setSearchedColumn(dataIndex);
        };
        return handleSearch;
      };

      const handleReset = clearFilters => {
        if (typeof clearFilters === "function") {
          clearFilters();
        }
        setSearchText("");
      };
      return (
        <div className="tableBuilder-search-popup">
          <Input
            className="tableBuilder-search-input"
            ref={searchInput}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys && selectedKeys[0]}
            onChange={handleSearchInputChange}
            onPressEnter={handleSearchFunc(selectedKeys, confirm, dataIndex)}
          />
          <Button
            className="tableBuilder-search-buttons"
            type="primary"
            onClick={handleSearchFunc(selectedKeys, confirm, dataIndex)}
            icon="search"
            size="small"
          >
            Search
          </Button>
          <Button
            className="tableBuilder-search-buttons"
            onClick={() => handleReset(clearFilters)}
            size="small"
          >
            Reset
          </Button>
        </div>
      );
    },
    filterIcon: filtered => (
      <Icon
        type="search"
        className={filtered ? "tableBuilder-search-icon" : undefined}
      />
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
          highlightClassName="tableBuilder-serch-highlighter"
          searchWords={searchText.split}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      )
  });

  const searchInput = useRef();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [showColumnFilter, setColumnFilter] = useState(false);
  const [headerTitles, setHeaderTitles] = useState([]);
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
      <div className="tableBuilder-column-filter">
        <Button
          type="link"
          onClick={handleIconClick}
          className="column-filter-icon"
        >
          <Icon type="filter" />
          Filter columns
        </Button>
        <div>
          {showColumnFilter && (
            <Checkbox.Group
              options={headerTitles}
              onChange={handleColumnFilter}
              defaultValue={headerTitles}
            />
          )}
        </div>
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

export default TableBuilder;
