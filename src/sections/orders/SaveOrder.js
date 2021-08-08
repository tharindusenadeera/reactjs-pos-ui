import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ButtonCustom } from "../../components/button";
import { addItem } from "../../actions/order";
import swal from "sweetalert";

import { deleteAllItems } from "../../actions/selectedItems";

const SaveOrder = ({ type }) => {
  const dispatch = useDispatch();
  const selectedItems = useSelector((state) => state.selectedItems);
  const customer = useSelector((state) => state.customer);
  const orderType = useSelector((state) => state.common);

  const addOrder = type === "add";

  /**
   * * mandatory order details will be extracted and formatted in this func
   * @returns order details as a object
   */

  const getOrderMenuItems = () => {
    const order = [];

    selectedItems?.forEach((product) => {
      const menu_option_category_menu_option_array = [];

      if (product?.categories?.length > 0) {
        product.categories.forEach((category) => {
          menu_option_category_menu_option_array.push(category?.item?.id);
        });

        order.push({
          id: product.productKey,
          qty: product.quantity,
          menu_option_category_menu_option_id:
            menu_option_category_menu_option_array,
        });
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
   * * General func implimented for draft and add orders
   * @returns order object
   */

  const createOrder = () => {
    const orderMenuItemsObj = getOrderMenuItems();
    const diliveryDetailsObj = getOrderDiliveryDetails();

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
          status: type,
        };
      }
    } else {
      return {
        order_type: orderType?.mealType,
        customer_id: customer?.customerDetails?.id,
        order_menu_items: orderMenuItemsObj,
        status: type,
      };
    }
  };

  /**
   * * this func will add the order
   * @returns status of the add order
   */

  const handleAddOrder = async () => {
    const order = createOrder();
    let obj = {};
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
    return obj;
  };

  /**
   * *Common function used for handle add and draft order
   */

  const handleOrder = () => {
    const title = addOrder ? "Confirm Order ?" : "Draft Order ?";
    const orderHandle = addOrder ? handleAddOrder : handleDraftOrder;

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

  return (
    <ButtonCustom
      type="primary"
      className="green"
      btnTitle={addOrder ? "Add Order" : "Draft Order"}
      onClick={handleOrder}
      disabled={!selectedItems.length}
    />
  );
};

export default SaveOrder;
