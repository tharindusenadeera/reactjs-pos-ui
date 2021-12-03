import React from "react";
import { Table } from "antd";
import styled from "styled-components";
import Theme from "../../utils/Theme";

const TableAnt = styled(Table)`
  .ant-table-thead {
    tr {
      th {
        background-color: ${Theme.colors.$greye9ecef};
      }
    }
  }
  .ant-table-body {
    &::-webkit-scrollbar {
      width: 5px;
      height: 5px;
    }
    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
    }
    &::-webkit-scrollbar-thumb {
      background-color: ${Theme.colors.$greyd3d7dc};
      //outline: 1px solid ${Theme.colors.$greye9ecef};
    }
  }
`;

export const TableCustom = (props) => {
  return (
    <TableAnt
      columns={props.columns}
      dataSource={props.dataSource}
      // pagination={
      //   props.pagination
      // } /* Example :- pagination={{ pageSize: 20 }} */
      scroll={props.scroll} /* Example :- scroll={{ x: 1500, y: 300 }} */
      pagination={props.pagination}
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
