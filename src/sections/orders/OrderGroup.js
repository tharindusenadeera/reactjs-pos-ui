import React, { useState } from "react";
import { OrderView } from "./OrderView";
import { TabsCustom } from "../../components/tabs";
import { Tabs } from "antd"; /* Tharindu try to remove this part */

const { TabPane } = Tabs;

export const OrderGroup = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const clickOK = () => {
    setIsModalVisible(false);
  };

  return (
    <TabsCustom>
      <TabPane tab="Tab 1 Title" key="1">
        <OrderView clickOK={clickOK} />
      </TabPane>
      <TabPane tab="Tab 2 Title" key="2">
        <OrderView clickOK={clickOK} />
      </TabPane>
      <TabPane tab="Tab 3 Title" key="3">
        <OrderView clickOK={clickOK} />
      </TabPane>
    </TabsCustom>
  );
};
