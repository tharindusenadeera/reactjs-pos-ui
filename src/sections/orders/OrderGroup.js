import React, { useState, useEffect } from "react";
import { OrderView } from "./OrderView";
import { TabsCustom } from "../../components/tabs";
import { Tabs } from "antd"; /* Tharindu try to remove this part */

const { TabPane } = Tabs;

export const OrderGroup = (props) => {
  const { clickOK, getTypeOrders, typeTab } = props;
  const [currentTab, setCurrentTab] = useState("1");
  const [allTypeOrders, setAllTypeOrders] = useState({});

  useEffect(() => {
    setAllTypeOrders(getTypeOrders(typeTab));
  }, [typeTab]);

  const getCategoriesOrders = (tab) => {
    return (
      allTypeOrders &&
      allTypeOrders.length > 0 &&
      allTypeOrders.filter((item) => {
        return item.status === tab;
      })
      );
  };

  const tabCallback = (tab) => {
    // current tab can be get from currentTab if necessary
    setCurrentTab(tab)
  }

  return (
    <TabsCustom tabCallback={tabCallback}>
      <TabPane tab="Placed Orders" key="1">
        <OrderView 
          clickOK={clickOK}
          tab={"placed"} 
          getTabOrders={getCategoriesOrders}
        />
      </TabPane>
      <TabPane tab="Preparing Orders" key="2">
        <OrderView 
          clickOK={clickOK} 
          tab={"preparing"} 
          getTabOrders={getCategoriesOrders}
        />
      </TabPane>
      <TabPane tab="Draft Orders" key="draft">
        <OrderView 
          clickOK={clickOK} 
          tab={"draft"} 
          getTabOrders={getCategoriesOrders}
        />
      </TabPane>
      <TabPane tab="Settled Orders" key="settled">
        <OrderView 
          clickOK={clickOK} 
          tab={"settled"} 
          getTabOrders={getCategoriesOrders}
        />
      </TabPane>
    </TabsCustom>
  );
};
