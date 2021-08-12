import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ButtonCustom } from "../../components/button";
import { addItem, updateItem } from "../../actions/order";
import swal from "sweetalert";

import { deleteAllItems } from "../../actions/selectedItems";

const SaveOrder = ({ type, order_id, width, cls, click}) => {
  const dispatch = useDispatch();
  const selectedItems = useSelector((state) => state.selectedItems.productList);
  const orderMetaData = useSelector((state) => state.selectedItems.metaData);

  const customer = useSelector((state) => state.customer);
  const orderType = useSelector((state) => state.common);

  const addOrder = type === "add";
  const updateOrder = type === "update";
  const updateDraft = type === "updateDraft";
  const confirmPay = type === "confirmPay";
  const draftOrder = type === "draft";

  /**
   * * mandatory order details will be extracted and formatted in this func
   * @param {parameter for update} isUpdate
   * @returns order details as a object
   */

  const getOrderMenuItems = (isUpdate) => {
    const order = [];

    selectedItems?.forEach((product) => {
      const menu_option_category_menu_option_array = [];
      // this id may be changes after finalize the services for update
      let order_menu_item_id = undefined;
      
      if (product?.categories?.length > 0) {
        product.categories.forEach((category) => {
          if (category?.item?.menu_option_category_menu_option_id) {
            order_menu_item_id = category?.item?.id;
            menu_option_category_menu_option_array.push(category.item.menu_option_category_menu_option_id);
          }
        });
        
        if (isUpdate) {
          order.push({
            id: product.productKey,
            qty: product.quantity,
            order_menu_item_id: order_menu_item_id,
            menu_option_category_menu_option_id:
              menu_option_category_menu_option_array,
          });
        } else {
          order.push({
            id: product.productKey,
            qty: product.quantity,
            menu_option_category_menu_option_id:
              menu_option_category_menu_option_array,
          });
        }

      } else {
        order.push({
          id: product.productKey,
          qty: product.quantity,
          menu_option_category_menu_option_id: [],
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
    const saveType = (draftOrder || updateDraft) ? 'draft' : 'add';

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
          delivery_address_line_1: diliveryDetailsObj?.delivery_address_line_1 || null,
          delivery_address_line_2: diliveryDetailsObj?.delivery_address_line_2 || null,
          delivery_phone_number: diliveryDetailsObj?.delivery_phone_number || null,

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
        delivery_address_line_1: diliveryDetailsObj?.delivery_address_line_1 || null,
        delivery_address_line_2: diliveryDetailsObj?.delivery_address_line_2 || null,
        delivery_phone_number: diliveryDetailsObj?.delivery_phone_number || null,

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
    const saveType = (draftOrder || updateDraft) ? 'draft' : 'add';

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
        customer_id: customer?.customerDetails?.id,
        order_menu_items: orderMenuItemsObj,
        status: saveType,
      };
    }
  };


  /**
     * * this func will update the order
     * @returns status of the updated order
     */
  const handleUpdateOrder = async () => {
    const order = createUpdateOrder();
    let obj = {};

    if (order) {
      const data = await dispatch(updateItem(order_id, order));

      if (data?.status === "success") {
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
    } else {
      obj = {
        message: "Please add delivery details !",
        status: "error",
      };
    }
    return obj;
  }

  /**
   * * this func will add the order
   * @returns status of the add order
   */

  const handleAddOrder = async () => {
    const order = createOrder();
    let obj = {};

    if (customer?.customerDetails?.id) {
      if (order) {
        const data = await dispatch(addItem(order));

        if (data?.status === "success") {
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
      } else {
        obj = {
          message: "Please add delivery details !",
          status: "error",
        };
      }
    } else {
      obj = {
        message: "Please add customer details !",
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
    const data = await dispatch(addItem(order));
    let obj = {};

    if (data?.status === "success") {
      dispatch(deleteAllItems());
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
    const data = await dispatch(addItem(order));
    let obj = {};

    if (customer?.customerDetails?.id) {
      if (data?.status === "success") {
        dispatch(deleteAllItems());
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
    } else {
      obj = {
        message: "Please add customer details !",
        status: "error",
      };
    }
    return obj;
  };

  /**
   * *Common function used for handle add and draft order
   */

  const handleOrder = () => {
    const title = addOrder ? "Confirm Order ?" :
                  updateOrder ? "Update Order ?" :
                  updateDraft ? "Update Draft ?" : "Draft Order ?";
                  
    const orderHandle = addOrder ? handleAddOrder :
                        updateOrder ? handleUpdateOrder :
                        updateDraft ? handleUpdateDraftOrder: handleDraftOrder;

    swal({
      title: title,
      text: "",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((value) => {
      if (value) {
        orderHandle().then((res) => {
          if (res.status == "success") {
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
    swal({
      title: "Confirm Order ?",
      text: "",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((value) => {
      if (value) {
        handleAddOrder().then((res) => {
          if (res.status === "success") {
            swal(res.message, "", "success").then(() => {
                  click();
            });
            
          } else {
            swal(res.message, "Please Try Again!", "error");
          }
        });
      } else {
        swal("Process Terminated!");
      }
    });
  }

  return (
    <ButtonCustom
      disabled={!selectedItems.length}
      width={width}
      type="primary"
      className={cls ? cls : "green"}
      btnTitle={
        addOrder ? "Add Order" :
        updateOrder ? "Update Order" :
        updateDraft ? "Update Draft" :
        confirmPay ? "Confirm & Pay" : "Draft Order"
        }
      onClick={confirmPay ? handleConfirmAndPay : handleOrder}
    />
  );
};

export default SaveOrder;
