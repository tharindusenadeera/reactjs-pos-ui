import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ButtonCustom } from "../../components/button";
import swal from "sweetalert";

import { addItem, addTable, updateItem } from "../../actions/order";
import {
  deleteAllItems,
  addAllItems,
  updateMetaData,
} from "../../actions/selectedItems";
import { resetMealType, addMealType } from "../../actions/common";
import {
  addDeliveryInformations,
  customerDetails,
} from "../../actions/customer";
import { getProducts } from "../../actions/products";
import { getFormattedOrder } from "./OrderConvertions";
import { printBillBar, printBillKitchen } from "../../api/common";

const SaveOrder = ({
  type,
  prevType,
  order_id,
  width,
  cls,
  callBack,
  discounts,
}) => {
  const dispatch = useDispatch();
  const selectedItems = useSelector((state) => state.selectedItems.productList);
  const orderMetaData = useSelector((state) => state.selectedItems.metaData);

  const customer = useSelector((state) => state.customer);
  const orderType = useSelector((state) => state.common);
  const order = useSelector((state) => state.order);
  const [tableNumber, setTableNumber] = useState("");
  const halfPaystate = useSelector((state) => state.halfPayOrder);

  const products = useSelector((state) => state.products);
  const [disableOptionEnable, setDisabledOptionEnable] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const addOrder = type === "add";
  const updateOrder = type === "update";
  const updateDraft = type === "updateDraft";
  const confirmPay = type === "confirmPay";
  const draftOrder = type === "draft";
  const payDueAmount = type === "payDueAmount";
  const pay = type === "pay";

  React.useEffect(() => {
    if (halfPaystate?.fullyPaid) {
      setDisableButton(true);
      setDisabledOptionEnable(true);
    } else if (halfPaystate?.fullyPaid === false) {
      setDisabledOptionEnable(true);
      setDisableButton(false);
    } else {
      setDisabledOptionEnable(false);
    }
  }, [halfPaystate]);

  React.useEffect(() => {
    if (order?.tableNumber) {
      setTableNumber(order.tableNumber);
    } else if (order?.addOrder?.table_id) {
      setTableNumber(order.addOrder.table_id);
    }
  }, [order]);
  /**
   * * mandatory order details will be extracted and formatted in this func
   * @param {parameter for update} isUpdate
   * @returns order details as a object
   */

  const getOrderMenuItems = (isUpdate) => {
    const order = [];

    selectedItems?.forEach((product) => {
      const menu_option_category_menu_option_array = [];
      const addon_id = [];

      if (product?.categories?.length > 0) {
        product.categories.forEach((category) => {
          if (category?.item?.menu_option_category_menu_option_id) {
            menu_option_category_menu_option_array.push(
              category.item.menu_option_category_menu_option_id
            );
          }
        });

        product.selectAddons?.forEach((selectAddon) => {
          const addon = product.menu_item_addons?.find(
            (addon) => addon.value === selectAddon
          );
          if (addon) {
            addon_id.push(addon.pivot.addon_id);
          }
        });

        if (isUpdate) {
          order.push({
            id: product.productKey,
            qty: product.quantity,
            addon_id: addon_id,
            order_menu_item_id: product?.order_menu_item_id,
            menu_option_category_menu_option_id:
              menu_option_category_menu_option_array,
            menu_item_comment: product.orderComments,
          });
        } else {
          order.push({
            id: product.productKey,
            qty: product.quantity,
            addon_id: addon_id,
            menu_option_category_menu_option_id:
              menu_option_category_menu_option_array,
            menu_item_comment: product.orderComments,
          });
        }
      } else {
        order.push({
          id: product.productKey,
          qty: product.quantity,
          menu_option_category_menu_option_id: [],
          addon_id: [],
          menu_item_comment: "",
        });
      }
    });

    return order;
  };

  /**
   * * delivery deatisl get from redux store
   * @returns details of delivery
   */

  const getOrderDiliveryDetails = () => {
    const diliveryDetails = customer?.deliveryInformations;

    if (diliveryDetails) {
      return {
        customer_id: diliveryDetails.customer_id,
        delivery_first_name: diliveryDetails.delivery_first_name,
        delivery_last_name: diliveryDetails.delivery_last_name,
        delivery_city_id: diliveryDetails.delivery_city_id,
        delivery_address_line_1: diliveryDetails.delivery_address_line_1,
        delivery_address_line_2: diliveryDetails.delivery_address_line_2,
        delivery_phone_number: diliveryDetails.delivery_phone_number,
      };
    }
  };

  /**
   * * General func implimented for create update order
   * @returns order object
   */

  const createUpdateOrder = () => {
    const orderMenuItemsObj = getOrderMenuItems(true);
    const diliveryDetailsObj = getOrderDiliveryDetails();
    const saveType = draftOrder || updateDraft ? "draft" : "placed";

    if (orderType?.mealType === "deliver") {
      let valueMisssig = false;

      for (const detailKey in diliveryDetailsObj) {
        if (!diliveryDetailsObj[detailKey]) {
          valueMisssig = true;
        }
      }

      if (valueMisssig && addOrder) {
        return false;
      } else {
        return {
          order_id: orderMetaData?.order_id,
          customer_id: orderMetaData?.customer_id,
          billing_address_1: orderMetaData?.billing_address_1 || null,
          billing_address_2: orderMetaData?.billing_address_2 || null,

          delivery_first_name: diliveryDetailsObj?.delivery_first_name || null,
          delivery_last_name: diliveryDetailsObj?.delivery_last_name || null,
          delivery_city_id: diliveryDetailsObj?.delivery_city_id || null,
          delivery_address_line_1:
            diliveryDetailsObj?.delivery_address_line_1 || null,
          delivery_address_line_2:
            diliveryDetailsObj?.delivery_address_line_2 || null,
          delivery_phone_number:
            diliveryDetailsObj?.delivery_phone_number || null,

          order_type: orderType?.mealType,
          status: saveType,
          order_menu_items: orderMenuItemsObj,
        };
      }
    } else {
      return {
        order_id: orderMetaData?.order_id,
        customer_id: orderMetaData?.customer_id,
        billing_address_1: orderMetaData?.billing_address_1 || null,
        billing_address_2: orderMetaData?.billing_address_2 || null,

        delivery_first_name: diliveryDetailsObj?.delivery_first_name || null,
        delivery_last_name: diliveryDetailsObj?.delivery_last_name || null,
        delivery_city_id: diliveryDetailsObj?.delivery_city_id || null,
        delivery_address_line_1:
          diliveryDetailsObj?.delivery_address_line_1 || null,
        delivery_address_line_2:
          diliveryDetailsObj?.delivery_address_line_2 || null,
        delivery_phone_number:
          diliveryDetailsObj?.delivery_phone_number || null,

        order_type: orderType?.mealType,
        status: saveType,
        order_menu_items: orderMenuItemsObj,
      };
    }
  };

  /**
   * * General func implimented for draft and add orders
   * @returns order object
   */

  const createOrder = () => {
    const orderMenuItemsObj = getOrderMenuItems();
    const diliveryDetailsObj = getOrderDiliveryDetails();
    const saveType = draftOrder || updateDraft ? "draft" : "placed";

    if (orderType?.mealType === "deliver") {
      let valueMisssig = false;

      for (const detailKey in diliveryDetailsObj) {
        if (!diliveryDetailsObj[detailKey]) {
          valueMisssig = true;
        }
      }

      if (valueMisssig && addOrder) {
        return false;
      } else {
        return {
          ...diliveryDetailsObj,
          customer_id: customer?.customerDetails?.id,
          order_type: orderType?.mealType,
          order_menu_items: orderMenuItemsObj,
          status: saveType,
        };
      }
    } else {
      return {
        order_type: orderType?.mealType,
        customer_name: customer?.customerDetails?.first_name,
        order_menu_items: orderMenuItemsObj,
        status: saveType,
      };
    }
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
   * * this function will populate the recentaly places order
   * @param {newly added or updated order} order
   */

  const updateStoresWithPlacedOrder = (order) => {
    const order_type = order?.order_type;
    const shippingDetail = {
      customer_id: order?.customer_id,
      delivery_first_name: order?.delivery_first_name,
      delivery_last_name: order?.delivery_last_name,
      delivery_city_id: order?.delivery_city_id,
      delivery_address_line_1: order?.delivery_address_line_1,
      delivery_address_line_2: order?.delivery_address_line_2,
      delivery_phone_number: order?.delivery_phone_number,
    };

    // populating stores with selected order
    dispatch(addMealType(order_type));
    dispatch(addDeliveryInformations(shippingDetail));
    dispatch(customerDetails(order?.customer));

    // remove following bcz of anormal behaviour (think no need to update all)
    // dispatch(addAllItems(selectedItems));
    // const selectedItems = getFormattedOrder(order, products);

    // update meta data only
    dispatch(
      updateMetaData({
        customer: order.customer,
        customer_id: order.customer_id,
        billing_address_1: order.billing_address_1,
        billing_address_2: order.billing_address_2,
        order_type: order.order_type,
        status: order.status,
        order_id: order.id,
        payment_status: order.payment_status,
        amount_paid: order.amount_paid,
        order_due_amount: order.order_due_amount,
      })
    );
  };

  /**
   * * This function get the updated products and save
   */

  const updateProducts = async (order) => {
    await dispatch(getProducts());

    // only execute for placed orders not drafts
    if (order) {
      updateStoresWithPlacedOrder(order);
    }
  };

  /**
   * * this func will update the order
   * @returns status of the updated order
   */

  const handleUpdateOrder = async () => {
    const order = createUpdateOrder();
    let obj = {};
    if (orderType?.mealType === "dine_in") {
      order.table_id = tableNumber;
    }

    if (discounts) {
      order.discount_type = discounts.key == "1" ? "percentage" : "fixed";
      order.discount_value = discounts.value;
    }
    const data = await dispatch(updateItem(order));

    if (data?.status === "success") {
      // cleanStores();
      updateProducts(data?.data);
      obj = {
        message: "Order Updated Successfully !",
        status: "success",
      };
    } else {
      obj = {
        message: "Something went wrong !",
        status: "error",
      };
    }
    return obj;
  };

  /**
   * * this func will add the order
   * @returns status of the add order
   */

  const handleAddOrder = async () => {
    const order = createOrder();
    if (orderType?.mealType === "dine_in") {
      order.table_id = tableNumber;
    }

    if (discounts) {
      order.discount_type = discounts.key == "1" ? "percentage" : "fixed";
      order.discount_value = discounts.value;
    }

    let obj = {};
    const data = await dispatch(addItem(order));

    if (data?.status === "success") {
      printBillBar(data?.data.id);
      printBillKitchen(data?.data.id);
      // cleanStores();
      updateProducts(data?.data);
      dispatch(addTable(null));
      obj = {
        message: "Order Placed Successfully !",
        status: "success",
      };
    } else {
      obj = {
        message: "Something went wrong !",
        status: "error",
      };
    }

    return obj;
  };

  /**
   * * this func will save the order and reset the table if the saving sucess
   * @returns status of the updated draft
   */

  const handleUpdateDraftOrder = async () => {
    const order = createUpdateOrder();
    if (orderType?.mealType === "dine_in") {
      order.table_id = tableNumber;
    }

    if (discounts) {
      order.discount_type = discounts.key == "1" ? "percentage" : "fixed";
      order.discount_value = discounts.value;
    }

    const data = await dispatch(updateItem(order));
    let obj = {};

    if (data?.status === "success") {
      cleanStores();
      updateProducts();
      obj = {
        message: "Update Draft Successfully !",
        status: "success",
      };
    } else {
      obj = {
        message: "Something went wrong !",
        status: "error",
      };
    }
    return obj;
  };

  /**
   * * this func will save the order and reset the table if the saving sucess
   * @returns status of the draft order
   */

  const handleDraftOrder = async () => {
    const order = createOrder();
    if (orderType?.mealType === "dine_in") {
      order.table_id = tableNumber;
    }
    const data = await dispatch(addItem(order));
    let obj = {};

    if (data?.status === "success") {
      cleanStores();
      updateProducts();
      obj = {
        message: "Order Draft Successfully !",
        status: "success",
      };
    } else {
      obj = {
        message: "Something went wrong !",
        status: "error",
      };
    }
    return obj;
  };

  /**
   * *Common function used for handle add and draft order
   */

  const handleOrder = () => {
    const title = addOrder
      ? "Confirm Order ?"
      : updateOrder
      ? "Update Order ?"
      : updateDraft
      ? "Update Draft ?"
      : "Draft Order ?";

    const handleFunc = addOrder
      ? handleAddOrder
      : updateOrder
      ? handleUpdateOrder
      : updateDraft
      ? handleUpdateDraftOrder
      : handleDraftOrder;

    // prev draft saved now adding as order --> update as updateOrder
    const orderHandle =
      prevType === "draft" && addOrder ? handleUpdateOrder : handleFunc;
    swal({
      title: title,
      text: "",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((value) => {
      if (value) {
        orderHandle().then((res) => {
          if (res.status === "success") {
            swal(res.message, "", "success");
          } else {
            swal(res.message, "Please Try Again!", "error");
          }
          // swal(status);
        });
      } else {
        swal("Process Terminated!");
      }
    });
  };

  /**
   ** This function will handle the confirm and pay
   ** With click() the modal will enable to pay
   */

  const handleConfirmAndPay = () => {
    // if there is a order id then it should be existing order --> update order
    // update order funtion remove 'handleUpdateOrder' because of immediate change in 15-09-2021 10.35pm
    
    const handleFunc = orderMetaData?.order_id
      ? ''
      : handleAddOrder;
    const title = payDueAmount ? "Pay the Due Amount?" : pay ? "Pay ?" : "Confirm Order ?";

    swal({
      title: title,
      text: "",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((value) => {
      if (value) {
        if (handleFunc) {
          handleFunc().then((res) => {
            if (res.status === "success") {
              const orderSnapshot = Object.assign(
                {},
                { productList: selectedItems }
              );
              // cleanStores();
              updateProducts();
              callBack(orderSnapshot);
            } else {
              swal(res.message, "Please Try Again!", "error");
            }
          });
        } else {
          // already added
          console.log('alreadt adding confirm and pay');
          const orderSnapshot = Object.assign(
            {},
            { productList: selectedItems }
          );
          // cleanStores();
          updateProducts();
          callBack(orderSnapshot);
        }

      } else {
        swal("Process Terminated!");
      }
    });
  };

  const handleClick = () => {
    // need to check if (delivery order) => both should be there

    const diliveryDetailsObj = getOrderDiliveryDetails();
    let deliveryInfoMissing = false;
    let customerInfoMissing = null;
    if (customer?.customerDetails == null) {
      customerInfoMissing = {};
    }
    // let customerInfoMissing =
    //   Object.keys(customer?.customerDetails).length === 0;

    if (orderType?.mealType === "deliver") {
      for (const detailKey in diliveryDetailsObj) {
        if (!diliveryDetailsObj[detailKey]) {
          deliveryInfoMissing = true;
        }
      }
    }

    if (deliveryInfoMissing) {
      const message =
        customerInfoMissing && orderType?.mealType === "deliver"
          ? "Please add customer details !"
          : "Please add delivery details !";
      swal(message, "", "error");
    } else if (orderType?.mealType === "dine_in" && !tableNumber) {
      swal("Please select a table", "", "error");
    } else {
      if (confirmPay || payDueAmount || pay) {
        handleConfirmAndPay();
      } else {
        handleOrder();
      }
    }
  };

  return (
    <ButtonCustom
      disabled={
        disableOptionEnable
          ? disableButton
          : !selectedItems.length || orderMetaData?.payment_status === "success"
      }
      width={width}
      type="primary"
      className={cls ? cls : "green"}
      btnTitle={
        addOrder
          ? "Place Order"
          : updateOrder
          ? "Update Order"
          : updateDraft
          ? "Update Draft"
          : confirmPay
          ? "Confirm & Pay"
          : payDueAmount
          ? "Pay Due Amount"
          : pay
          ? "Pay"
          : "Draft Order"
      }
      onClick={handleClick}
    />
  );
};

export default SaveOrder;
