import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Theme from "../../utils/Theme";
import { DeleteButton } from "../../components/button/DeleteButton";
import { PayEditButton } from "../../components/button/PayEditButton";
import { PdfButton } from "../../components/button/PdfButton";
import { deleteOrder, getOrder } from "../../api/order";

import { addAllItems } from "../../actions/selectedItems";
import { addMealType } from "../../actions/common";
import {
  addDeliveryInformations,
  customerDetails,
} from "../../actions/customer";

import { addOrder, addTable } from "../../actions/order";

import { getFormattedOrder } from "./OrderConvertions";
import { Typography } from "antd";
import { Fragment } from "react";
import { printBill } from "../../api/common";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { paymentStatus } from "../../constants/Constants";

const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;

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
  align-items: flex-start;
`;

const PrintButton = styled.div`
  margin-left: 8px;
`;

const ErrorMessageDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PreLoader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const OrderView = (props) => {
  const { clickOK, tab, getCategoriesOrders, handleDelete } = props;
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products);
  const fetchingData = useSelector((state) => state.common.isFetching);

  const orders = getCategoriesOrders(tab);
  const handleCancel = () => {};

  const renderPaymentStatus = (status) => {
    let statusColor = "";
    let renderStatus = "";
    let renderKey;

    paymentStatus.map((item, key) => {
      if (status == item.key) {
        statusColor = item.color;
        renderStatus = item.value;
        renderKey = key;
      }
    });

    return (
      <Typography.Text type={statusColor} strong key={renderKey}>
        {renderStatus}
      </Typography.Text>
    );
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

        dispatch(addTable(order?.table_id));
        dispatch(addOrder(order));
        const selectedItems = getFormattedOrder(order, products);
        dispatch(addAllItems(selectedItems));
      }
    });
  };

  const handlePay = (id) => {
    getOrderDetails(id);
    clickOK();
  };

  const printButtonClicked = (id) => {
    printBill(id).then((res) => {
      let mywindow = window.open("", "", "width=700,height=700");
      mywindow.document.write(res.data);
      window.close();
    });
  };

  const getTotalItems = (order) => {
    let totItems = 0;

    order?.order_menu_items_full?.forEach((item) => {
      totItems += item?.order_menu_item_qty;
    });
    return totItems || 0;
  };

  const renderOrderDetails = (order, key) => {
    let customerName = (
      <>
        {order?.customer?.first_name} {order?.customer?.last_name}{" "}
      </>
    );
    return (
      <div className="col col-sm-6 col-md-4" key={key}>
        <div className="order-box">
          <h3>Order {order?.id}</h3>

          <div className="d-flex">
            <p>
              <label>Name</label>
              {order?.customer_name ? order?.customer_name : customerName}
            </p>
          </div>

          <div className="d-flex">
            <p>
              <label>Address</label>
              {order?.customer?.address_line_1} {" "}
              {order?.customer?.address_line_2}
            </p>
          </div>

          {order?.table_id && (
            <div className="d-flex">
              <p>
                <label>Table Number</label>
                {order?.table_id}
              </p>
            </div>
          )}

          <div className="d-flex">
            <p>
              <label>Payment Status</label>
              {renderPaymentStatus(order?.payment_status)}
            </p>
          </div>

          <div className="d-flex">
            <p>
              <label>Total Items</label>
              {getTotalItems(order)}
            </p>
          </div>

          <div className="d-flex">
            <p>
              <label>Due/Balance Amount</label>$ {order?.order_total}
            </p>
          </div>

          <ActionButtons>
            <PayEditButton
              btnClass="mr-2 yellow"
              type="primary"
              onClick={() => handlePay(order?.id)}
            />

            <DeleteButton
              confirm={() => handleDelete(order?.id)}
              cancel={handleCancel}
              disabled={order?.status === "prepared" ? true : false}
            />

            {order?.status === "placed" && (
              <PrintButton>
                <PdfButton
                  onClick={() => printButtonClicked(order?.id)}
                  disabled={false}
                  record={order}
                />
              </PrintButton>
            )}
          </ActionButtons>
        </div>
      </div>
    );
  };

  return (
    <Wrapper>
      {fetchingData ? (
        <PreLoader>
          <Spin indicator={antIcon} />
        </PreLoader>
      ) : (
        <Fragment>
          <div className="row">
            {orders &&
              orders?.map((order, key) => {
                if (tab == "completed" && order?.payment_status == "sucess") {
                  return renderOrderDetails(order, key);
                } else {
                  return renderOrderDetails(order, key);
                }
              })}
          </div>

          {!fetchingData && orders?.length === 0 ? (
            <ErrorMessageDiv>
              <Typography.Text type="danger" strong>
                No data Found
              </Typography.Text>
            </ErrorMessageDiv>
          ) : (
            <Fragment />
          )}
        </Fragment>
      )}
    </Wrapper>
  );
};
