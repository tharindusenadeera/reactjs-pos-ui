import React, { useRef, useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Theme from "../../utils/Theme";
import { SelectNInputField } from "../../components/field/SelectNInputField";
import { TableCustom } from "../../components/table";
import { ButtonCustom } from "../../components/button";
import { DeleteButton } from "../../components/button/DeleteButton";
import { ModalCustom } from "../../components/modal";
import { ItemView } from "../orders/ItemView";
import { updateItem, deleteItem, addItem } from "../../actions/selectedItems";
import AddOrder from "../orders/AddOrder";
import {
  GenerateUniqueId,
  CheckforMatch,
  GetItemFromId,
} from "../../utils/generateUniqueId";
import { InputField } from "../../components/field/InputField";

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
      max-height: calc(100vh - 428px) !important;
    }
  }
`;

const ButtonWarp = styled.div`
  text-align: end;
  margin-top: 15px;

  .ant-btn {
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
  const alreadyAddedItems = useSelector((state) => state.selectedItems);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [selectedProperties, setSelectedProperties] = useState({});
  const [itemBeforeEdit, setItemBeforeEdit] = useState({});

  const [disableOk, setDisableOk] = useState(false);
  const dispatch = useDispatch();

  const isRealValue = (obj) => {
    return obj && obj !== 'null' && obj !== 'undefined' && obj !== '';
  }

  useEffect(() => {
    let isCategoryAvailable = selectedProperties?.menu_option_categories?.length > 0;
    let items = selectedProperties?.categories?.filter((category) => isRealValue(category.item));
    let isItemSelected = (items && items?.length) || !isCategoryAvailable;

    if (selectedProperties?.quantity && selectedProperties?.quantity !== 0 && isItemSelected) {
      setDisableOk(false);
    } else {
      setDisableOk(true);
    }
  }, [selectedProperties]);

  /**
   * * This function will do the price calculation update with the quantity
   * todo: maybe this function need to handle separately after services
   * @param { Selected or new Item} item
   * @param { key} itemKey
   * @returns
   */

  const handlePriceCalculation = (item, itemKey) => {
    // disounted value and total value should update with services
    return { ...item, subtotal: item?.price * item?.quantity, key: itemKey };
  };

  /**
   * * ClickUpdate fucntion will triggered when user click update button
   * * Handling 3 different Senarios
   * * If the key is not changed with the update
   * * If the key is changed with the update and new key already exists
   * * If the key is changed with the update and new key is not exists
   */

  const clickUpdate = () => {
    const itemKey = GenerateUniqueId(selectedProperties);
    const newItem = handlePriceCalculation(selectedProperties, itemKey);
    const isItemExists = CheckforMatch(itemKey, alreadyAddedItems);

    // Either key not changed OR new key already exists
    if (isItemExists) {
      const item = GetItemFromId(itemKey, alreadyAddedItems);

      if (item.key === itemBeforeEdit.key) {
        // Last saved key didn't changed with edit -> SHOULD UPDATE PREV
        dispatch(updateItem(newItem));
      } else {
        // Last saved key changed with edit -> SHOULD DELETE PREV (selected one) and UPDATE EXISTING ONE(exists in table)
        const updatedItem = handlePriceCalculation(
          { ...item, quantity: newItem.quantity + item.quantity },
          item.key
        );

        dispatch(deleteItem(itemBeforeEdit));
        dispatch(updateItem(updatedItem));
      }
    } else {
      // new Key after edit and not found in existing -> SHOULD ADD THE NEW  and DELETE PREV
      dispatch(deleteItem(itemBeforeEdit));
      dispatch(addItem(newItem));
    }

    setIsModalVisible(false);
    setSelectedProperties({});
    setItemBeforeEdit({});
  };

  /**
   * * Item delete event handle when user delete the item
   * @param { Delete record} record
   */

  const handleDelete = (record) => {
    dispatch(deleteItem(record));
  };

  /**
   * * Modal click cancel event handling
   */

  const clickCancel = () => {
    setIsModalVisible(false);
    setSelectedProperties({});
    setItemBeforeEdit({});
  };

  /**
   * * Update function which triggered from the ItemSection and save the state in here
   * @param { Item with user update } updatedItem
   */

  const updateSelectedproperties = (updatedItem) => {
    setSelectedProperties(updatedItem);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  /**
   * * This function will trigger just after edit button click in the table
   * * Setting the selectedProperties
   * * Set the Initial state before user edit the items
   * @param {* selected item } item
   */

  const editRow = (item) => {
    const selectedItem = { ...item, visibleModal: true };
    setSelectedProperties(selectedItem);
    setItemBeforeEdit(item);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      //fixed: "left",
      width: 100,
    },
    {
      title: "Qty",
      dataIndex: "quantity",
      width: 50,
    },
    {
      title: "Subtotal",
      dataIndex: "subtotal",
      width: 70,
    },
    {
      title: "Actions",
      dataIndex: "",
      key: "x",
      width: 30,
      fixed: "right",

      render: (text, record) => (
        <div className="d-flex">
          <Fragment>
            <ModalCustom
              btnTitle={Theme.icons.$edit}
              btnClass="mr-2 yellow"
              type="primary"
              title="Edit item in order"
              okText="Update item"
              okType="primary yellow"
              className="body-nonpadding"
              handleOk={clickUpdate}
              handleCancel={clickCancel}
              disableOk={disableOk}
              showModal={showModal}
              isModalVisible={record?.key === itemBeforeEdit?.key}
              record={record}
              editRow={editRow}
            >
              <ItemView
                selectedProperties={selectedProperties}
                updateSelectedproperties={updateSelectedproperties}
              />
            </ModalCustom>
          </Fragment>
        </div>
      ),
    },
    {
      title: "",
      dataIndex: "",
      key: "x",
      width: 30,
      fixed: "right",
      render: (text, record) => (
        <DeleteButton
          confirmTitle="Delete item ?"
          confirm={() => handleDelete(record)}
        />
      ),
    },
  ];

  const handleSearch = e => {
    let letter = e.target.value;
    
  } 

  return (
    <div>
      {/* <SelectNInputField
        showSearch={false}
        label="Selected Product"
        Selectplaceholder="Choose Type"
      /> */}
      <InputField label="Selected Product" onChange={handleSearch}/>
      <TableWarp>
        <TableCustom
          columns={columns}
          dataSource={alreadyAddedItems}
          scroll={{ x: 730, y: 200 }}
        />
      </TableWarp>
      <ButtonWarp>
        <DeleteButton btnTitle="Cancel Order" disabled={true} />
        <ButtonCustom
          type="primary"
          className="green"
          btnTitle="Draft Order"
          disabled={true}
        />

        <AddOrder />
      </ButtonWarp>
    </div>
  );
};
