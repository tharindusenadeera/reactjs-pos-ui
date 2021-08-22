import React, { useState, useEffect } from "react";
import {useDispatch} from "react-redux";
import { TabsCustom } from "../../components/tabs";
import { Tabs } from "antd"; /* Tharindu try to remove this part */

import { isFetching } from "../../actions/common";
import { getAllOrders } from "../../api/order";
import { OrderGroup } from "./OrderGroup";
const { TabPane } = Tabs;

export const OrderType = (props) => {
  const { clickOK, refresh } = props;
  const [allOrders, setAllOrders] = useState([]);
  const [typeTab, setTypeTab] = useState("dine_in");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isFetching(true));

    getAllOrders().then((res) => {
      if (res.data.status === "success") {
        setAllOrders(res.data.data);
        dispatch(isFetching(false));
      }
    });
  }, [refresh]);

  const getTypeOrders = (tab) => {
    return (
      allOrders &&
      allOrders.filter((item) => {
        return item.order_type === tab;
      })
      );
  };

  const typeCallback = (tab) => {
    // current tab can be get from currentTab if necessary
    setTypeTab(tab)
  }

  return (
    <TabsCustom tabCallback={typeCallback}>
      <TabPane tab="Dine In" key="dine_in">
        <OrderGroup clickOK={clickOK} getTypeOrders={getTypeOrders} typeTab={typeTab}/>
      </TabPane>
      <TabPane tab="Take Away" key="take_away">
        <OrderGroup clickOK={clickOK} getTypeOrders={getTypeOrders} typeTab={typeTab}/>
      </TabPane>
      <TabPane tab="Diliver" key="deliver">
        <OrderGroup clickOK={clickOK} getTypeOrders={getTypeOrders} typeTab={typeTab}/>
      </TabPane>
    </TabsCustom>
  );
};
