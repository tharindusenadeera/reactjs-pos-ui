import React, { useState } from "react";
import { OrderView } from "./OrderView";
import { TabsCustom } from "../../components/tabs";
import { Tabs } from "antd"; /* Tharindu try to remove this part */

const { TabPane } = Tabs;

export const OrderGroup = (props) => {
  const { clickOK } = props;

  return (
    <TabsCustom>
      <TabPane tab="Tab 1 Title" key="1">
        <OrderView clickOK={clickOK} tab={1}/>
      </TabPane>
      <TabPane tab="Tab 2 Title" key="2">
        <OrderView clickOK={clickOK} tab={2}/>
      </TabPane>
      <TabPane tab="Draft Orders" key="draft">
        <OrderView clickOK={clickOK} tab={"draft"}/>
      </TabPane>
    </TabsCustom>
  );
};
