import React, { useState } from "react";
import { OrderView } from "./OrderView";
import { TabsCustom } from "../../components/tabs";
import { Tabs } from "antd"; /* Tharindu try to remove this part */

const { TabPane } = Tabs;

export const OrderGroup = (props) => {
  const { clickOK, typedOrders } = props;
  const [currentTab, setCurrentTab] = useState("1");

  const getCategoriesOrders = (tab) => {
    return (
      typedOrders &&
      typedOrders.filter((item) => {
        return item.status === tab;
      })
    );
  };

  const tabCallback = (tab) => {
    // current tab can be get from currentTab if necessary
    setCurrentTab(tab);
  };

  return (
    <TabsCustom tabCallback={tabCallback}>
      <TabPane tab="Placed Orders" key="1">
        <OrderView
          clickOK={clickOK}
          tab={"placed"}
          getCategoriesOrders={getCategoriesOrders}
        />
      </TabPane>
      <TabPane tab="Prepared Orders" key="prepared">
        <OrderView
          clickOK={clickOK}
          tab={"prepared"}
          getCategoriesOrders={getCategoriesOrders}
        />
      </TabPane>
      <TabPane tab="Draft Orders" key="draft">
        <OrderView
          clickOK={clickOK}
          tab={"draft"}
          getCategoriesOrders={getCategoriesOrders}
        />
      </TabPane>
      <TabPane tab="Settled Orders" key="settled">
        <OrderView
          clickOK={clickOK}
          tab={"settled"}
          getCategoriesOrders={getCategoriesOrders}
        />
      </TabPane>
    </TabsCustom>
  );
};
