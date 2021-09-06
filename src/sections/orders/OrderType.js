import React, { useState } from "react";
import { TabsCustom } from "../../components/tabs";
import { Tabs } from "antd"; /* Tharindu try to remove this part */

import { OrderGroup } from "./OrderGroup";

const { TabPane } = Tabs;

export const OrderType = (props) => {
  const { clickOK, allOrders, handleDelete } = props;
  const [typeTab, setTypeTab] = useState("dine_in");

  const getTypeOrders = (tab) => {
    if (tab === "online") {
      return (
        allOrders &&
        allOrders.filter((item) => {
          return item.order_source === tab;
        })
      );
    }
    return (
      allOrders &&
      allOrders.filter((item) => {
        return item.order_type === tab;
      })
    );
  };
  const typedOrders = getTypeOrders(typeTab);

  const typeCallback = (tab) => {
    // current tab can be get from currentTab if necessary
    setTypeTab(tab);
  };

  return (
    <TabsCustom tabCallback={typeCallback}>
      <TabPane tab="Dine In" key="dine_in">
        <OrderGroup
          clickOK={clickOK}
          typedOrders={typedOrders}
          handleDelete={handleDelete}
          orderType="dine_in"
        />
      </TabPane>
      <TabPane tab="Take Away" key="take_away">
        <OrderGroup
          clickOK={clickOK}
          typedOrders={typedOrders}
          handleDelete={handleDelete}
          orderType="take_away"
        />
      </TabPane>
      <TabPane tab="Online" key="online">
        <OrderGroup
          clickOK={clickOK}
          typedOrders={typedOrders}
          handleDelete={handleDelete}
          orderType="online"
        />
      </TabPane>
      <TabPane tab="Deliver" key="deliver">
        <OrderGroup
          clickOK={clickOK}
          typedOrders={typedOrders}
          handleDelete={handleDelete}
          orderType="deliver"
        />
      </TabPane>
    </TabsCustom>
  );
};
