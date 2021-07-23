import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { RadioCustom } from "../../components/radio";
import { Radio } from "antd";
import { addMealType } from "../../actions/common";

export const CatagorySection = (props) => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(1);

  const handleMealType = (e) => {
    setValue(e.target.value);
    dispatch(addMealType(e.target.value));
  };
  return (
    <Fragment>
      <RadioCustom onChange={handleMealType} value={value}>
        <Radio value={1}>Dine In</Radio>
        <Radio value={2}>Take Away</Radio>
        <Radio value={3}>Deliver</Radio>
      </RadioCustom>
    </Fragment>
  );
};
