import React, {useState} from "react";
import { RadioCustom } from "../../components/radio";
import { Radio } from "antd";
import CashPayment from './pay-methods/PayByCash';
import CardPayment from './pay-methods/PayByCard';

export const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState(1);

  const PaymentComponent = () => {
    switch(paymentMethod) {
      case 1:
        return <CashPayment />;
      case 2:
        return <CardPayment />;
      default:
        return <CashPayment />;
    } 
  }

  const onChecked = (item) => {
    setPaymentMethod(item);
  }

  return (
    <div>
      <RadioCustom onChecked={onChecked}>
        <Radio value={1}>Cash</Radio>
        <Radio value={2}>Card</Radio>
      </RadioCustom>
      <PaymentComponent />
    </div>
  );
};
