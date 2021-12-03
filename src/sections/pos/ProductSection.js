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
import { Tooltip, Tag } from "antd";

import {
  updateItem,
  deleteItem,
  addItem,
  deleteAllItems,
} from "../../actions/selectedItems";
import { resetMealType } from "../../actions/common";
import {
  addDeliveryInformations,
  customerDetails,
} from "../../actions/customer";

import {
  GenerateUniqueId,
  CheckforMatch,
  GetItemFromId,
} from "../../utils/generateUniqueId";
import { InputField } from "../../components/field/InputField";
import swal from "sweetalert";

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
`;

export const ProductSection = () => {
  const alreadyAddedItems = useSelector(
    (state) => state.selectedItems.productList
  );
  const orderMetaData = useSelector((state) => state.selectedItems.metaData);

  const [tableContent, setTableContent] = useState(alreadyAddedItems);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProperties, setSelectedProperties] = useState({});
  const [itemBeforeEdit, setItemBeforeEdit] = useState({});
  const [disableOk, setDisableOk] = useState(false);
  const [quantityError, setQuantityError] = useState({});

  const dispatch = useDispatch();

  const isRealValue = (obj) => {
    return obj && obj !== "null" && obj !== "undefined" && obj !== "";
  };

  const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  };

  const tagCss = {
    background: "#63b10e",
    borderColor: "#58a208",
    fontSize: "12px",
    color: "#FFFFFF",
  };

  useEffect(() => {
    setTableContent(alreadyAddedItems);
  }, [alreadyAddedItems]);

  useEffect(() => {
    let isCategoryAvailable =
      selectedProperties?.menu_option_categories?.length > 0;
    let items = selectedProperties?.categories?.filter((category) =>
      isRealValue(category.item)
    );
    let isItemSelected = (items && items?.length) || !isCategoryAvailable;

    if (
      selectedProperties?.quantity &&
      selectedProperties?.quantity !== 0 &&
      isItemSelected &&
      (!quantityError.status || quantityError.status === 0)
    ) {
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
    const addonCost = item.addonCost ? item.addonCost : 0;
    // disounted value and total value should update with services
    return {
      ...item,
      subtotal: (parseFloat(item?.price) + addonCost) * item?.quantity,
      key: itemKey,
    };
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
    setQuantityError({});
  };

  const qunatityErrorHandle = (data) => {
    setQuantityError(data);
  };

  const addonToolTip = (data) => {
    let addons =
      data?.selectAddons?.length > 0
        ? data?.selectAddons.join(" , ").toString()
        : "";
    let text = addons ? addons : "Not selected";

    return "Addons : " + text;
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      //fixed: "left",
      render: (address, record) => (
        <Tooltip placement="topLeft" title={addonToolTip(record)}>
          {address}
        </Tooltip>
      ),
      width: 80,
    },
    {
      title: "Categories",
      key: "categories",
      dataIndex: "categories",
      render: (categories) => (
        <>
          {categories?.map((category) => {
            return (
              <Tag key={category?.id} style={{ ...tagCss }}>
                {category?.tag}
              </Tag>
            );
          })}
        </>
      ),
      width: 70,
    },
    {
      title: "Qty",
      dataIndex: "quantity",
      width: 20,
    },
    {
      title: "Subtotal",
      dataIndex: "subtotal",
      width: 40,
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
              btnDisabled={
                orderMetaData && orderMetaData.payment_status === "success"
              }
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
                alreadyAddedItems={alreadyAddedItems}
                qunatityErrorHandle={qunatityErrorHandle}
                quantityError={quantityError}
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
          disabled={orderMetaData && orderMetaData.payment_status === "success"}
          confirm={() => handleDelete(record)}
        />
      ),
    },
  ];

  const handleSearch = (e) => {
    let text = e.target.value;
    const lower_text = text?.toLowerCase();

    const filteredOrders = alreadyAddedItems.filter((order) =>
      order?.name?.toLowerCase().includes(lower_text)
    );

    setTableContent(filteredOrders);
  };

  /**
   * * This function will clean out redux stores
   */

  const cleanStores = () => {
    dispatch(deleteAllItems());
    dispatch(resetMealType());
    dispatch(addDeliveryInformations({}));
    dispatch(customerDetails({}));
  };

  /**
   * * Cancel and clear the added items in order to prevent
   * * simply remove all the items from redux store
   */
  const deleteOrder = () => {
    const title =
      orderMetaData && orderMetaData.order_id
        ? "Clear Order ?"
        : "Cancel Order ?";
    swal({
      title: title,
      text: "",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((value) => {
      if (value) {
        cleanStores();
      } else {
        swal("Process Terminated!");
      }
    });
  };

  return (
    <div>
      {/* <SelectNInputField
        showSearch={false}
        label="Selected Product"
        Selectplaceholder="Choose Type"
      /> */}
      <InputField label="Selected Product" onChange={handleSearch} />
      {orderMetaData && orderMetaData.order_id ? (
        <Fragment>
          <b>Order Number - {orderMetaData?.order_id}</b>
        </Fragment>
      ) : (
        <Fragment />
      )}
      <TableWarp>
        <TableCustom
          columns={columns}
          dataSource={tableContent}
          scroll={{ x: 730, y: 500 }}
          pagination={false} 
        />
      </TableWarp>

      <ButtonWarp>
        <ButtonCustom
          btnTitle={
            orderMetaData && orderMetaData.order_id
              ? "Clear Order"
              : "Cancel Order"
          }
          disabled={!alreadyAddedItems.length}
          onClick={deleteOrder}
          className="btn-danger"
        />
      </ButtonWarp>
    </div>
  );
};
