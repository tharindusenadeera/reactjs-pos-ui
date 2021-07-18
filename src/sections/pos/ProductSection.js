import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import styled from "styled-components";
import Theme from "../../utils/Theme";
import { SelectNInputField } from "../../components/field/SelectNInputField";
import { TableCustom } from "../../components/table";
import { ButtonCustom } from "../../components/button";
import { DeleteButton } from "../../components/button/DeleteButton";
import { useWindowDimensions } from "../../utils/useWindowDimension";
import { ModalCustom } from "../../components/modal";
import { ItemView } from "../orders/ItemView";
import { updateItem, deleteItem } from '../../actions/selectedItems';

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

  .ant-table-body {
    @media ${Theme.device.xs} {
      max-height: calc(100vh - 418px) !important;
    }
    @media ${Theme.device.sm} {
      max-height: calc(100vh - 345px) !important;
    }
    @media ${Theme.device.md} {
      max-height: calc(100vh - 698px) !important;
    }
    @media ${Theme.device.lg} {
      max-height: calc(100vh - 496px) !important;
    }
  }
`;

const ButtonWarp = styled.div`
  text-align: end;
  margin-top: 15px;
`;

export const ProductSection = () => {
  const selectedItems = useSelector((state) => state.selectedItems);

  // selected item state from modal (set from child comp and dispatch in here
  // since modal item add, edit, delete handle happen in here)
  const [selectedItem, setSelectedItem] = useState({});
  const dispatch = useDispatch();

  const clickUpdate = () => {
    dispatch(updateItem(selectedItem));
  }

  const clickDelete = () => {
    dispatch(deleteItem(selectedItem));
  }

  const clickCancel = () => {}

  const updateSelectedItem = (updatedItem) => {
    setSelectedItem(updatedItem);
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      //fixed: "left",
      width: 110,
    },
    {
      title: "Taste",
      dataIndex: "taste",
      width: 60,
    },
    {
      title: "Size",
      dataIndex: "size",
      width: 60,
    },
    {
      title: "Qty",
      dataIndex: "qty",
      width: 40,
    },
    {
      title: "Discount",
      dataIndex: "discount",
      width: 60,
    },
    {
      title: "Subtotal",
      dataIndex: "subtotal",
      width: 60,
    },
    {
      title: "",
      dataIndex: "",
      key: "x",
      width: 40,
      render: (text, record) => (
        <ModalCustom
          btnTitle={Theme.icons.$edit}
          type="secondary"
          title="Edit item in order"
          okText="Update item"
          className="body-nonpadding"
          clickOk={clickUpdate}
          clickCancel={clickCancel}
        >
          <ItemView item={record} selectedItem={selectedItem} updateSelectedItem={updateSelectedItem}/>
        </ModalCustom>
      ),
    },

    {
      title: "",
      dataIndex: "",
      key: "y",
      width: 40,
      render: (text, record) => (
        <ModalCustom
          btnTitle={Theme.icons.$delete}
          type="secondary"
          title="Delete item in order"
          okText="Delete item"
          className="body-nonpadding"
          clickOk={clickDelete}
          clickCancel={clickCancel}
        >
          <ItemView item={record} selectedItem={selectedItem} updateSelectedItem={updateSelectedItem}/>
        </ModalCustom>
      ),
    },
  ];

  return (
    <div>
      <SelectNInputField
        showSearch={false}
        label="Selected Product"
        Selectplaceholder="Choose Type"
      />
      <TableWarp>
        <TableCustom columns={columns} dataSource={selectedItems} scroll={{ y: 100 }} />
      </TableWarp>
      <ButtonWarp>
        <DeleteButton btnTitle="Cancel Order" />
        <ButtonCustom type="primary" btnTitle="Draft Order" className="ml-2" />
      </ButtonWarp>
    </div>
  );
};
