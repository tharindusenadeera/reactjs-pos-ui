import React, { useState } from "react";
import { OrderView } from "./OrderView";
import { TabsCustom } from "../../components/tabs";
import { Tabs } from "antd"; /* Tharindu try to remove this part */

const { TabPane } = Tabs;

export const OrderGroup = (props) => {
  const { clickOK } = props;

  return (
    <TabsCustom>
      <TabPane tab="Placed Orders" key="1">
        <OrderView clickOK={clickOK} tab={"placed"}/>
      </TabPane>
      <TabPane tab="Preparing Orders" key="2">
        <OrderView clickOK={clickOK} tab={"preparing"}/>
      </TabPane>
      <TabPane tab="Draft Orders" key="draft">
        <OrderView clickOK={clickOK} tab={"draft"}/>
      </TabPane>
      <TabPane tab="Settled Orders" key="settled">
        <OrderView clickOK={clickOK} tab={"settled"}/>
      </TabPane>
    </TabsCustom>
  );
};
