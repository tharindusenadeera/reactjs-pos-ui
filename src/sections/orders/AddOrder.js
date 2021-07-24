import React from 'react';
import { useSelector, useDispatch} from "react-redux";
import { ButtonCustom } from "../../components/button";
import { addItem } from "../../actions/order";
import swal from "sweetalert";

const AddOrder = () => {
    const dispatch = useDispatch();
    const selectedItems = useSelector((state) => state.selectedItems);
    const customer = useSelector((state) => state.customer.addCustomer);

    const orderItem = () => {
      const order = [];

      selectedItems?.forEach((product) => {
        if (product?.categories?.length > 0) {
          product.categories.forEach((category) => {
            order.push({
              id: product.productKey,
              qty: product.quantity,
              menu_option_category_menu_option_id: category?.item?.id
            })
          })
        } else {
          order.push({
            id: product.productKey,
            qty: product.quantity,
            menu_option_category_menu_option_id: ''
          })
        }
      })

      return order;
    }

    const createOrder = () => {
      const content = orderItem();
      return {
        customer_id : customer.id,
        order_menu_items : content
       };
    }

    const handleAddOrder = async () => {
      const order = createOrder();
      // console.log(order)
      const data = await dispatch(addItem(order));

      if (data.status === "false") {
        return 'Adding Unsucessful !'
      } else {
        return 'Adding Sucessful !'
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
