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

import { getFormattedOrder } from "./OrderConvertions";
import { Typography } from "antd";
import { Fragment } from "react";
import { printBill } from "../../api/common";
import swal from "sweetalert";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

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
  const { clickOK, tab, getCategoriesOrders } = props;
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products);
  const fetchingData = useSelector((state) => state.common.isFetching);

  const orders = getCategoriesOrders(tab);

  const handleConfirm = (id) => {
    deleteOrder(id)
      .then((res) => {
        if (res.data.status === "success") {
          if (tab == "settled") {
            swal("Order Deleted Successfully", "", "success");
          } else {
            swal(`${res.data.message}`, "", "success");
          }
        } else {
          swal(`${res.data.message}`, "Please Try Again!", "error");
        }
      })
      .catch((error) => {
        swal("Something Went Wrong !", "Please Try Again!", "error");
      });
  };

  const handleCancel = () => {};

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
              orders?.map((order, key) => (
                <div className="col col-sm-6 col-md-4" key={key}>
                  <div className="order-box">
                    <h3>Order {order?.id}</h3>

                    <div className="d-flex">
                      <p>
                        <label>Name</label>
                        {order?.customer?.first_name}{" "}
                        {order?.customer?.last_name}
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
                        <label>Due Amount</label>$ {order?.order_total}
                      </p>
                    </div>

                    <ActionButtons>
                      <PayEditButton
                        btnClass="mr-2 yellow"
                        type="primary"
                        onClick={() => handlePay(order?.id)}
                      />

                      <DeleteButton
                        confirm={() => handleConfirm(order?.id)}
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
              ))}
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
