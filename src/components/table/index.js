import React from "react";
import { Table } from "antd";

export const TableCustom = (props) => {
  return (
    <Table
      columns={props.columns}
      dataSource={props.dataSource}
      //pagination={{ pageSize: 20 }}
      scroll={{ y: 240 }}
    />
  );
};

/* Sample Code

const columns = [
    {
      title: "Name",
      dataIndex: "name",
      //width: 150,
    },
    {
      title: "Quantity",
      dataIndex: "qty",
      // width: 150,
    },
    {
      title: "Discount",
      dataIndex: "discount",
    },
    {
      title: "Subtotal",
      dataIndex: "subtotal",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: () => <a>Delete</a>,
    },
  ];

  const data = [];
  for (let i = 0; i < 20; i++) {
    data.push({
      key: i,
      name: `Edward King ${i}`,
      age: 32,
      address: `London, Park Lane no. ${i}`,
    });
  }

*/
