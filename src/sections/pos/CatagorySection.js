import React, { Fragment } from "react";
import { RadioCustom } from "../../components/radio";
import { Radio } from "antd";

export const CatagorySection = () => {
  return (
    <Fragment>
      <RadioCustom>
        <Radio value={1}>Dine In</Radio>
        <Radio value={2}>Take Away</Radio>
        <Radio value={3}>Deliver</Radio>
      </RadioCustom>
    </Fragment>
  );
};
