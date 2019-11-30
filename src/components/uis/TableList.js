import React from "react";
import classnames from 'classnames';
import { Table } from "antd";
import PropTypes from "prop-types";

const TableList = props => {
  return (
    <div className={classnames(`${props.containerClassName}`)}>
      <h1>{props.title}</h1>
      <Table columns={props.columns} dataSource={[{ firstName: 'Rizan', lastName: 'Mohomed' }]} />
    </div>
  );
};

TableList.propTypes = {
  title: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      dataIndex: PropTypes.string.isRequired
    })
  ),
  containerClassName: PropTypes.string.isRequired
};

export default TableList;
