import React from "react";
import styled from "styled-components";
import { SelectNInputField } from "../../components/field/SelectNInputField";
import { TableCustom } from "../../components/table";
import { ButtonCustom } from "../../components/button";
import { DeleteButton } from "../../components/button/DeleteButton";

const TableWarp = styled.div`
  margin-top: 15px;

  .ant-pagination {
    display: none;
  }
`;

const ButtonWarp = styled.div`
  text-align: end;
  margin-top: 15px;
`;

export const ProductSection = () => {
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
      render: () => <DeleteButton />,
    },
  ];

  const data = [];
  for (let i = 0; i < 20; i++) {
    data.push({
      key: i,
      name: `Checken Nuggets ${i}`,
      qty: 32,
      discount: `$ 20`,
      subtotal: `$ 280`,
    });
  }

  return (
    <div>
      <SelectNInputField
        showSearch={false}
        label="Select Product"
        Selectplaceholder="Choose Type"
      />
      <TableWarp>
        <TableCustom columns={columns} dataSource={data} />
      </TableWarp>
      <ButtonWarp>
        <DeleteButton />
        <ButtonCustom type="primary" btnTitle="Draft Order" className="ml-2" />
      </ButtonWarp>
    </div>
  );
};
