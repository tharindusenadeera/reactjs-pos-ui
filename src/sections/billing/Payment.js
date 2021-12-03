import React, { useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RadioCustom } from "../../components/radio";
import { Radio } from "antd";
import CashPayment from "./pay-methods/PayByCash";
import CardPayment from "./pay-methods/PayByCard";
import styled from "styled-components";
import * as Constants from "../../constants/Constants";

import { getOrder } from "../../api/order";
import { updateMetaData } from "../../actions/selectedItems";
import { addOrder } from "../../actions/order";

const PaymentCompWrap = styled.div`
  padding: 25px 0;
`;

export const Payment = ({ orderSnapShot, closePopUp }) => {
  // order bill properties
  const { orderBillSummary } = orderSnapShot;
  // order other details
  const orderProperty = useSelector((state) => state?.order?.addOrder);
  const orderMetaData = useSelector((state) => state.selectedItems.metaData);

  const [paymentMethod, setPaymentMethod] = useState(1);
  const dispatch = useDispatch();

  // after payment sucess the metadata update
  const paymentSucessCallback = (orderId) => {
    // const metaData = { ...orderMetaData, payment_status: "success" };
    getOrder(orderId).then((res) => {
      if (res.data.status === "success") {
        const order = res.data.data;
        const metaData =  { 
          ordercustomer: order.customer,
          customer_id: order.customer_id,
          billing_address_1: order.billing_address_1,
          billing_address_2: order.billing_address_2,
          order_type: order.order_type,
          status: order.status,
          order_id: order.id,
          payment_status: order.payment_status,
          amount_paid: order.amount_paid,
          order_due_amount: order.order_due_amount,
        }
        
        // update both these because different part of the application both has used
        dispatch(updateMetaData(metaData));
        dispatch(addOrder(order));
      }
    });
  };

  const PaymentComponent = () => {
    switch (paymentMethod) {
      case 1:
        return (
          <CashPayment
            total={orderBillSummary?.tot}
            order={orderProperty}
            closePopUp={closePopUp}
            paymentSucessCallback={paymentSucessCallback}
          />
        );
      case 2:
        return (
          <CardPayment
            total={orderBillSummary?.tot}
            order={orderProperty}
            closePopUp={closePopUp}
            paymentSucessCallback={paymentSucessCallback}
          />
        );
      default:
        return (
          <CashPayment
            total={orderBillSummary?.tot}
            order={orderProperty}
            closePopUp={closePopUp}
            paymentSucessCallback={paymentSucessCallback}
          />
        );
    }
  };

  const onChecked = (item) => {
    setPaymentMethod(item.target.value);
  };

  return (
    <Fragment>
      <RadioCustom
        onChange={onChecked}
        value={paymentMethod}
        defaultValue={paymentMethod}
      >
        {Constants.paymentType.map((item, key) => {
          return (
            <Radio key={key} value={item.key}>
              {item.value}
            </Radio>
          );
        })}
      </RadioCustom>
      <PaymentCompWrap>
        <PaymentComponent />
      </PaymentCompWrap>
    </Fragment>
  );
};
