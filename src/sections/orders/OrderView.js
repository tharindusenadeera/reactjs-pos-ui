import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Theme from "../../utils/Theme";
import { DeleteButton } from "../../components/button/DeleteButton";
import { PayEditButton } from "../../components/button/PayEditButton";
import { getAllOrders, getOrder } from "../../api/order";

import { orderById } from "../../actions/order";
import { addAllItems } from "../../actions/selectedItems";
import { addMealType } from "../../actions/common";
import { addDeliveryInformations, customerDetails} from "../../actions/customer";

import { getFormattedOrder } from "./OrderConvertions";

const Wrapper = styled.div`
  .order-box {
    background-color: ${Theme.colors.$greye9ecef};
    border: 1px solid ${Theme.colors.$border};
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 30px;
    h3 {
      margin-bottom: 18px;
    }
    label {
      margin-bottom: unset;
      margin-right: 5px;
    }
    p {
      margin-bottom: 8px;
    }
  }
`;

const ActionButtons = styled.div`
  margin-top: 12px;
  display: flex;
`;

export const OrderView = (props) => {
  const { clickOK, tab } = props;
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState(tab);
  const products = useSelector((state) => state.products);

  useEffect(() => {
    getAllOrders().then((res) => {
      if (res.data.status == "success") {
        handleAllOrders(res.data.data);
      }
    });
  }, [selectedTab]);

  const handleAllOrders = (data) => {
    let orders = categoriesOrders(data);
    setOrders(orders);
  };

  const categoriesOrders = (data) => {
    return (
      data &&
      data.filter((item) => {
        return item.status == selectedTab;
      })
    );
  };

  const handleConfirm = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const renderPaymentStatus = (status) => {
    let paymentStatus = "";
    if (status == 1) {
      paymentStatus = "Paid";
    } else if (status == 0) {
      paymentStatus = "Pending";
    } else {
      paymentStatus = "Cancelled";
    }

    return paymentStatus;
  };

  const getOrderDetails = (id) => {
    getOrder(id).then((res) => {
      if (res.data.status === "success") {
        // dispatch(orderById(res.data.data));
        const order = res.data.data;

        const order_type = order?.order_type;
        const shippingDetail = {
          customer_id: order?.customer_id,
          delivery_first_name: order?.delivery_first_name,
          delivery_last_name:  order?.delivery_last_name,
          delivery_city_id:  order?.delivery_city_id,
          delivery_address_line_1:  order?.delivery_address_line_1,
          delivery_address_line_2:  order?.delivery_address_line_2,
          delivery_phone_number:  order?.delivery_phone_number,
        };

        // populating stores with selected order
        dispatch(addMealType(order_type));
        dispatch(addDeliveryInformations(shippingDetail));
        dispatch(customerDetails(order?.customer));

        const selectedItems = getFormattedOrder(order, products);
        dispatch(addAllItems(selectedItems));
      }
    });
  };

  const handlePay = (id) => {
    getOrderDetails(id);
    clickOK();
  };

  return (
    <Wrapper>
      <div className="row">
        {orders &&
          orders.map((order, key) => (
            <div className="col col-sm-6 col-md-4" key={key}>
              <div className="order-box">
                <h3>Order {key + 1}</h3>

                <div className="d-flex">
                  <p>
                    <label>Name</label>
                    {order?.customer?.first_name} {order?.customer?.last_name}
                  </p>
                </div>

                <div className="d-flex">
                  <p>
                    <label>Address</label>
                    {order?.customer?.address_line_1},{" "}
                    {order?.customer?.address_line_2}
                  </p>
                </div>

                {/* <div className="d-flex">
                  <p>
                    <label>Payment Status</label>
                    {renderPaymentStatus(order?.status)}
                  </p>
                </div> */}

                <div className="d-flex">
                  <p>
                    <label>Total Items</label>
                    {order?.order_menu_items_full?.length}
                  </p>
                </div>

                <div className="d-flex">
                  <p>
                    <label>Due Amount</label>$ {order?.total}
                  </p>
                </div>

                <ActionButtons>
                  <PayEditButton
                    btnClass="mr-2 yellow"
                    type="primary"
                    onClick={() => handlePay(order?.id)}
                  />
                  <DeleteButton confirm={handleConfirm} cancel={handleCancel} />
                </ActionButtons>
              </div>
            </div>
          ))}
      </div>
    </Wrapper>
  );
};
