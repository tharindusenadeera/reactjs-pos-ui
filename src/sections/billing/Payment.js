import React, { useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RadioCustom } from "../../components/radio";
import { Radio } from "antd";
import CashPayment from "./pay-methods/PayByCash";
import CardPayment from "./pay-methods/PayByCard";
import styled from "styled-components";
import * as Constants from "../../constants/Constants";

import { updateMetaData } from "../../actions/selectedItems";

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
  const paymentSucessCallback = () => {
    const metaData = { ...orderMetaData, payment_status: "success" };
    dispatch(updateMetaData(metaData));
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
