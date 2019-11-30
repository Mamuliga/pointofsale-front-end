import React from "react";
import { Icon } from "antd";
import classnames from "classnames";

export function getCustomerTableHeaders() {
  return [
    {
      title: "",
      dataIndex: "isActive",
      key: "isActive",
      width: "0.5%",
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
      width: "3%",
      sorter: true
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      width: "3%",
      sorter: true
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "2%",
      sorter: true,
      render(text) {
        return text ? <a href={`mailto:${text}`}>{text}</a> : <span>-</span>;
      }
    },
    {
      title: "Outstanding",
      dataIndex: "outstanding",
      key: "outstanding",
      width: "1%",
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
