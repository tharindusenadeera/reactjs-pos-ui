import React, { useRef } from "react";
import styled from "styled-components";
import Theme from "../../utils/Theme";
import { SelectNInputField } from "../../components/field/SelectNInputField";
import { TableCustom } from "../../components/table";
import { ButtonCustom } from "../../components/button";
import { DeleteButton } from "../../components/button/DeleteButton";
import { useWindowDimensions } from "../../utils/useWindowDimension";
import { ModalCustom } from "../../components/modal";
import { ItemView } from "../orders/ItemView";

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

export const ProductSection = () => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      //fixed: "left",
      width: 120,
    },
    {
      title: "Qty",
      dataIndex: "qty",
      width: 60,
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
      width: 80,
      render: () => (
        <ModalCustom btnTitle="Edit" type="secondary" title="Item Name here">
          <ItemView />
        </ModalCustom>
      ),
    },
  ];

  const data = [];
  for (let i = 0; i < 20; i++) {
    data.push({
      key: i,
      name: `Checken Nuggets ${i}`,
      qty: i,
      discount: `$ 20`,
      subtotal: `$ 280`,
    });
  }

  const { width } = useWindowDimensions();
  const TableBodySize = useRef("");
  if (width < Theme.breakpoints.xs) {
    TableBodySize.current = 190;
  } else if (width > Theme.breakpoints.sm) {
    TableBodySize.current = 195;
  }

  return (
    <div>
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
        <DeleteButton btnTitle="Cancel Order" />
        <ButtonCustom type="primary" btnTitle="Draft Order" className="ml-2" />
      </ButtonWarp>
    </div>
  );
};
