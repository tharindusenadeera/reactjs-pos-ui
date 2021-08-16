import React, { useState, Fragment } from "react";
import { useSelector } from "react-redux";
import { RadioCustom } from "../../components/radio";
import { Radio } from "antd";
import CashPayment from "./pay-methods/PayByCash";
import CardPayment from "./pay-methods/PayByCard";
import styled from "styled-components";
import * as Constants from "../../constants/Constants";

const PaymentCompWrap = styled.div`
  padding: 25px 0;
`;

export const Payment = ({
  orderSnapShot,
  closePopUp
}) => {
  // order bill properties
  const { orderBillSummary } = orderSnapShot;
  // order other details
  const orderProperty = useSelector((state) => state?.order?.addOrder);

  const [paymentMethod, setPaymentMethod] = useState(1);

  const PaymentComponent = () => {
    switch (paymentMethod) {
      case 1:
        return (
          <CashPayment
            total={orderBillSummary?.tot}
            order={orderBillSummary}
            closePopUp={closePopUp}
          />
        );
      case 2:
        return (
          <CardPayment
            total={orderBillSummary?.tot}
            order={orderBillSummary}
            closePopUp={closePopUp}
          />
        );
      default:
        return (
          <CashPayment
            total={orderBillSummary?.tot}
            order={orderBillSummary}
            closePopUp={closePopUp}
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
