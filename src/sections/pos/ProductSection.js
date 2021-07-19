import React, { useRef, useState, useEffect } from "react";
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

  .ant-btn {
    &:last-child {
      margin-left: 10px;
    }

    @media ${Theme.device.xs} {
      width: 100%;

      &:last-child {
        margin-left: unset;
        margin-top: 15px;
      }
    }
  }
`;

export const ProductSection = () => {
  const selectedItems = useSelector((state) => state.selectedItems);

  const [selectedProperties, setSelectedProperties] = useState({});
  const [disableOk, setDisableOk] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedProperties.quantity && selectedProperties.quantity !== 0) {
      setDisableOk(false);
    } else {
      setDisableOk(true);
    }
  }, [selectedProperties]);

  const handlePriceCalculation = (item) => {
    // disounted value and total value should update with services
    return {...item, subtotal: (item?.price * item?.quantity)};
  }

  const clickUpdate = () => {
    const updatedItem = handlePriceCalculation(selectedProperties)
    dispatch(updateItem(updatedItem));
  }

  const clickDelete = () => {
    dispatch(deleteItem(selectedProperties));
  }

  const clickCancel = () => {
  }

  const updateSelectedproperties = (updatedItem) => {
    setSelectedProperties(updatedItem);
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
      dataIndex: "quantity",
      width: 40,
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
          disableOk={disableOk}
        >
          <ItemView item={record} selectedProperties={selectedProperties} updateSelectedproperties={updateSelectedproperties}/>
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
          disableOk={disableOk}
        >
          <ItemView item={record} selectedProperties={selectedProperties} updateSelectedproperties={updateSelectedproperties}/>
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
        <ButtonCustom type="primary" btnTitle="Draft Order" />
      </ButtonWarp>
    </div>
  );
};
