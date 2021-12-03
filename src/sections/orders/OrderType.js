import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { TabsCustom } from "../../components/tabs";
import { Tabs } from "antd"; /* Tharindu try to remove this part */
import { OrderGroup } from "./OrderGroup";
import { clickedOrderTab } from "../../actions/common";

const { TabPane } = Tabs;

export const OrderType = (props) => {
  const { clickOK, allOrders, handleDelete, clickedTab } = props;
  const dispatch = useDispatch();
  const [typeTab, setTypeTab] = useState("dine_in");

  const typeCallback = (tab) => {
    setTypeTab(tab);
    clickedTab(tab);
    dispatch(clickedOrderTab(tab));
  };

  return (
    <TabsCustom tabCallback={typeCallback}>
      <TabPane tab="Dine In" key="dine_in">
        <OrderGroup
          clickOK={clickOK}
          typedOrders={allOrders}
          handleDelete={handleDelete}
          orderType="dine_in"
        />
      </TabPane>
      <TabPane tab="Take Away" key="take_away">
        <OrderGroup
          clickOK={clickOK}
          typedOrders={allOrders}
          handleDelete={handleDelete}
          orderType="take_away"
        />
      </TabPane>
      {/* <TabPane tab="Online" key="online">
        <OrderGroup
          clickOK={clickOK}
          typedOrders={allOrders}
          handleDelete={handleDelete}
          orderType="online"
        />
      </TabPane> */}
      <TabPane tab="Delivery" key="deliver">
        <OrderGroup
          clickOK={clickOK}
          typedOrders={allOrders}
          handleDelete={handleDelete}
          orderType="deliver"
        />
      </TabPane>
      <TabPane tab="Draft" key="draft">
        <OrderGroup
          clickOK={clickOK}
          typedOrders={allOrders}
          handleDelete={handleDelete}
          orderType="draft"
        />
      </TabPane>
    </TabsCustom>
  );
};
