import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RadioCustom } from "../../components/radio";
import { Radio } from "antd";
import { addMealType } from "../../actions/common";
import * as Constants from "../../constants/Constants";
import styled from "styled-components";
import { FlushButton } from "../../components/button/FlushButton";

import { deleteAllItems} from "../../actions/selectedItems";
import { resetMealType } from "../../actions/common"
import { addDeliveryInformations, customerDetails }  from "../../actions/customer";

const WrapContent = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const CatagorySection = (props) => {
  const dispatch = useDispatch();
  const mealType = useSelector((state) => state.common.mealType);
  const selectedItems = useSelector((state) => state.selectedItems.productList);

  const handleMealType = (e) => {
    dispatch(addMealType(e.target.value));
  };

  const flushButtonClick = () => {
    dispatch(deleteAllItems());
    dispatch(resetMealType());
    dispatch(addDeliveryInformations({}));
    dispatch(customerDetails({}));
  }

  return (
    <Fragment>
      <WrapContent>
        <RadioCustom onChange={handleMealType} value={mealType}>
          {Constants.mealTypes.map((item, key) => {
            return <Radio key={key} value={item.key}>{item.value}</Radio>;
          })}
        </RadioCustom>
      
        <FlushButton 
        onClick={flushButtonClick} 
        disabled={!selectedItems.length}
        width="block"/>
      </WrapContent>

    </Fragment>
  );
};
