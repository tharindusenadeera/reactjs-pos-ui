import React from "react";
import { RadioCustom } from "../../components/radio";
import { Radio } from "antd";

export const Payment = () => {
  return (
    <div>
      <RadioCustom>
        <Radio value={1}>Cash</Radio>
        <Radio value={2}>Card</Radio>
      </RadioCustom>

      <div>This is cash payment component</div>

      <div>This is card payment component</div>
    </div>
  );
};
