import React from "react";
import classNames from "classnames";
import { Avatar, Icon } from "antd";

export function getCustomerTableHeaders(getColumnSearchProps) {
  let columnSearchProps = () => {};
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
      title: "",
      dataIndex: "avatar",
      key: "avatar",
      width: "22%",
      render: () => <Avatar icon="user" />,
      ellipsis: true
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "22%",
      render: text => <a href="/">{text}</a>,
      sorter: true,
      ...columnSearchProps("name")
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
      title: "Contacts",
      dataIndex: "contacts",
      key: "contacts",
      width: "22%",
      sorter: true
    },
    {
      title: "Company Name",
      dataIndex: "company name",
      key: "company name",
      width: "22%",
      sorter: true
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
