import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RadioCustom } from "../../components/radio";
import { Radio } from "antd";
import { addMealType } from "../../actions/common";
import * as Constants from "../../constants/Constants";

export const CatagorySection = (props) => {
  const dispatch = useDispatch();
  const mealType = useSelector((state) => state.common.mealType);
  // const [value, setValue] = React.useState(mealType);

  const handleMealType = (e) => {
    // setValue(e.target.value);
    dispatch(addMealType(e.target.value));
  };
  return (
    <Fragment>
      <RadioCustom onChange={handleMealType} value={mealType}>
        {Constants.mealTypes.map((item, key) => {
          return <Radio key={key} value={item.key}>{item.value}</Radio>;
        })}
      </RadioCustom>
    </Fragment>
  );
};
