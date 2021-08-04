import React from 'react';
import { useSelector, useDispatch} from "react-redux";
import { ButtonCustom } from "../../components/button";
import { addItem } from "../../actions/order";
import swal from "sweetalert";

const AddOrder = () => {
    const dispatch = useDispatch();
    const selectedItems = useSelector((state) => state.selectedItems);
    const customer = useSelector((state) => state.customer);
    const orderType = useSelector((state) => state.common);

    const getOrderMenuItems = () => {
      const order = [];

      selectedItems?.forEach((product) => {
        const menu_option_category_menu_option_array = [];

        if (product?.categories?.length > 0) {

          product.categories.forEach((category) => {
            menu_option_category_menu_option_array.push(category?.item?.id);
          })

          order.push({
            id: product.productKey,
            qty: product.quantity,
            menu_option_category_menu_option_id: menu_option_category_menu_option_array
          })

        } else {
          order.push({
            id: product.productKey,
            qty: product.quantity,
            menu_option_category_menu_option_id: []
          })
        }
      })

      return order;
    }

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
        }
      }
    }

    const createOrder = () => {
      const orderMenuItemsObj = getOrderMenuItems();
      const diliveryDetailsObj = getOrderDiliveryDetails();

      if (orderType?.mealType === 'deliver') {
        let valueMisssig = false;

        for (const detailKey in diliveryDetailsObj) {
          if (!diliveryDetailsObj[detailKey]) {
            valueMisssig = true;
          }
        }
        
        if (valueMisssig) {
          return false;

        } else {

          return {
            ...diliveryDetailsObj,
            // customer_id: customer?.customerDetails?.id,
            order_type: orderType?.mealType,
            order_menu_items : orderMenuItemsObj,
          };
        }

      } else {

        return {
          order_type: orderType?.mealType,
          // customer_id: customer?.customerDetails?.id,
          order_menu_items : orderMenuItemsObj,
        };
      }
    }

    const handleAddOrder = async () => {
      const order = createOrder();

      if (order) {
        const data = await dispatch(addItem(order));

        if (data?.status === "success") {
          return 'Adding Sucessful !'
        } else {
          return 'Adding Unsucessful !'
        }
      } else {
        return 'Missing Dilivery Details in Order !'
      }
    }

    const handleOrder = () => {
        swal({
          title: "Confirm Order ?",
          text: "",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((value) => {
          if (value) {
            handleAddOrder().then((status) => {
              swal(status);
            })
          } else {
            swal("Process Terminated!");
          }
        })
      }

    return (
        <ButtonCustom 
        type="primary"
        className="green"
        btnTitle="Add Order" 
        onClick={handleOrder}
        disabled={!selectedItems.length} 
        />
    )
}

export default AddOrder;
