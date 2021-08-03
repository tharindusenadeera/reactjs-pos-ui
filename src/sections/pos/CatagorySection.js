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
        <Radio value={"dine_in"}>Dine In</Radio>
        <Radio value={"take_away"}>Take Away</Radio>
        <Radio value={"deliver"}>Deliver</Radio>
      </RadioCustom>
    </Fragment>
  );
};
