import React from "react";
import { OrderView } from "./OrderView";

export const OrderGroup = (props) => {
  const { clickOK, typedOrders, handleDelete } = props;

  return (
    <OrderView
      clickOK={clickOK}
      tab={"online"}
      orders={typedOrders}
      handleDelete={handleDelete}
    />
  );
};
