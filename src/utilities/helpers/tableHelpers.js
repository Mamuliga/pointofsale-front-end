import React from "react";
import classNames from 'classnames';
import { Avatar, Icon } from 'antd';

export const CustomersTablecolumns = [

  {
    title: '',
    dataIndex: 'address',
    key: 'address 3',
    render: () => <Avatar icon="user" />,
    ellipsis: true,
    // width: 100,
  },

  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a href='/'>{text}</a>,
    // width: 150,
  },
  {
    title: 'Email',
    dataIndex: 'age',
    key: 'age',
    // width: 80,
  },
  {
    title: 'Contacts',
    dataIndex: 'building',
    key: 'building',
    // width: 100,
  },
  {
    title: 'Company Name',
    dataIndex: 'address',
    key: 'address 2',
    ellipsis: true,
    // width: 100,
  },


];

export const CustomersTabledata = [

  {
    key: '1',
    name: 'John Brown',
    age: 32,
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 2 Lake Park, London No. 2 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
  {
    key: '4',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
  {
    key: '5',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
  {
    key: '6',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
  {
    key: '7',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
  {
    key: '8',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
  {
    key: '9',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
  {
    key: '10',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
  {
    key: '11',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
  {
    key: '12',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];


export const DashboardTablecolumns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => text,
    width: 150,
  },
  {
    title: 'Email',
    dataIndex: 'age',
    key: 'age',
    width: 80,
  },
  {
    title: 'Contects',
    dataIndex: 'building',
    key: 'building',
    width: 100,
  },
  {
    title: 'Company Name',
    dataIndex: 'address',
    key: 'address 2',
    ellipsis: true,
  },
  {
    title: 'Profile Picture',
    dataIndex: 'address',
    key: 'address 3',
    ellipsis: true,
  },


];

export const DashboardTabledata = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park, New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 2 Lake Park, London No. 2 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];
export function getCustomerTableHeaders(getColumnSearchProps) {
  let columnSearchProps = () => { };
  if (typeof getColumnSearchProps === "function") {
    columnSearchProps = getColumnSearchProps;
  }
  return [
    {
      title: "",
      dataIndex: "isActive",
      key: "isActive",
      width: "10%",
      render(isActive) {
        return (
          <Icon
            type={`${isActive ? "check" : "close"}`}
            className={classNames("table-in-icon", {
              "active-icon": isActive,
              "inactive-icon": !isActive
            })}
          />
        );
      }
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      width: "22%",
      sorter: true,
      ...columnSearchProps("firstName")
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      width: "22%",
      sorter: true
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "22%",
      sorter: true,
      render(text) {
        return text ? <a href={`mailto:${text}`}>{text}</a> : <span>-</span>;
      }
    },
    {
      title: "Outstanding",
      dataIndex: "outstanding",
      key: "outstanding",
      width: "22%",
      align: "right",
      defaultSortOrder: "ascend",
      sorter(v1, v2) {
        return v2.outstanding - v1.outstanding;
      },
      render(text) {
        return (
          <span>
            Rs:{" "}
            {parseFloat(text).toLocaleString("en-us", {
              minimumFractionDigits: 2
            })}
          </span>
        );
      }
    }
  ];
}
