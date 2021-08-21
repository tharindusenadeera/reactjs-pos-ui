import React, { useState, useEffect } from "react";
import {useDispatch} from "react-redux";
import { OrderView } from "./OrderView";
import { TabsCustom } from "../../components/tabs";
import { Tabs } from "antd"; /* Tharindu try to remove this part */

import { isFetching } from "../../actions/common";
import { getAllOrders } from "../../api/order";

const { TabPane } = Tabs;

export const OrderGroup = (props) => {
  const { clickOK, refresh } = props;
  const [allOrders, setAllOrders] = useState([]);
  const [currentTab, setCurrentTab] = useState("1");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isFetching(true));

    getAllOrders().then((res) => {
      if (res.data.status === "success") {
        dispatch(isFetching(false));
        setAllOrders(res.data.data);
      }
    });
  }, [refresh]);

  const getCategoriesOrders = (tab) => {
    return (
      allOrders &&
      allOrders.filter((item) => {
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
          tab={"cancelled"} 
          getTabOrders={getCategoriesOrders}
        />
      </TabPane>
    </TabsCustom>
  );
};
