import React, { useRef } from "react";
import styled from "styled-components";
import { SelectNInputField } from "../../components/field/SelectNInputField";
import { TableCustom } from "../../components/table";
import { ButtonCustom } from "../../components/button";
import { DeleteButton } from "../../components/button/DeleteButton";
import { InputNumberCustom } from "../../components/input/InputNumberCustom";
import Theme from "../../utils/Theme";
import { useWindowDimensions } from "../../utils/useWindowDimension";

const TableWarp = styled.div`
  margin-top: 15px;
  font-size: 0.813rem;

  .ant-table-thead > tr > th,
  .ant-table-tbody > tr > td,
  .ant-table tfoot > tr > th,
  .ant-table tfoot > tr > td {
    padding: 12px 12px;
  }

  .ant-pagination {
    display: none;
  }

  @media ${Theme.device.xs} {
  }
`;

const ButtonWarp = styled.div`
  text-align: end;
  margin-top: 15px;
`;

const InputWrap = styled.div`
  .ant-input-number {
    width: 80px;
  }
`;

export const ProductSection = () => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      //fixed: "left",
      width: 110,
    },
    {
      title: "Qty",
      dataIndex: "qty",
      width: 90,
    },
    {
      title: "Discount",
      dataIndex: "discount",
      width: 80,
    },
    {
      title: "Subtotal",
      dataIndex: "subtotal",
      width: 80,
    },
    {
      title: "",
      dataIndex: "",
      key: "x",
      width: 70,
      render: () => <DeleteButton />,
    },
  ];

  const data = [];
  for (let i = 0; i < 20; i++) {
    data.push({
      key: i,
      name: `Checken Nuggets ${i}`,
      qty: (
        <InputWrap>
          <InputNumberCustom min={0} max={1000} defaultValue={0} />
        </InputWrap>
      ),
      discount: `$ 20`,
      subtotal: `$ 280`,
    });
  }

  const { width } = useWindowDimensions();
  const TableBodySize = useRef("");
  if (width < Theme.breakpoints.xs) {
    TableBodySize.current = 120;
  } else if (width > Theme.breakpoints.sm) {
    TableBodySize.current = 200;
  } else if (width > Theme.breakpoints.md) {
    TableBodySize.current = 300;
  } else if (width > Theme.breakpoints.lg) {
    TableBodySize.current = 400;
  } else if (width > Theme.breakpoints.xl) {
    TableBodySize.current = 500;
  }

  return (
    <div>
      Width: {width} ~ Table Height: {TableBodySize.current}
      <SelectNInputField
        showSearch={false}
        label="Selected Product"
        Selectplaceholder="Choose Type"
      />
      <TableWarp>
        <TableCustom
          columns={columns}
          dataSource={data}
          scroll={{ y: TableBodySize.current }}
        />
      </TableWarp>
      <ButtonWarp>
        <DeleteButton />
        <ButtonCustom type="primary" btnTitle="Draft Order" className="ml-2" />
      </ButtonWarp>
    </div>
  );
};
