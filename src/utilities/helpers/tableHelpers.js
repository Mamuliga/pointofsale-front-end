import React from "react";
import { Icon } from "antd";
import classnames from "classnames";

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
            className={classnames("table-in-icon", {
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
