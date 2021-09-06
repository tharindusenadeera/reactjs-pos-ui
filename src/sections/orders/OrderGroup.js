import React, { useState } from "react";
import { OrderView } from "./OrderView";
import { TabsCustom } from "../../components/tabs";
import { Tabs } from "antd"; /* Tharindu try to remove this part */

const { TabPane } = Tabs;

export const OrderGroup = (props) => {
  const { clickOK, typedOrders, handleDelete, orderType } = props;
  const [currentTab, setCurrentTab] = useState("1");

  const getCategoriesOrders = (tab) => {
    if (orderType === "online" && tab === "completed") {
      return (
        typedOrders &&
        typedOrders.filter((item) => {
          return item.order_source == "online" && item.status === "prepared";
        })
      );
    } else if (orderType === "online" && tab === "take_away") {
      return (
        typedOrders &&
        typedOrders.filter((item) => {
          return item.order_source === orderType;
        })
      );
    } else if (orderType === "online" && tab === "online") {
      return (
        typedOrders &&
        typedOrders.filter((item) => {
          return (
            item.order_source === orderType && item.order_type == "deliver"
          );
        })
      );
    } else if (orderType === "take_away" && tab === "placed") {
      return (
        typedOrders &&
        typedOrders.filter((item) => {
          return item.order_source !== "online";
        })
      );
    } else if (orderType === "deliver" && tab === "placed") {
      return (
        typedOrders &&
        typedOrders.filter((item) => {
          return item.order_source !== "online";
        })
      );
    } else if (orderType === "deliver" && tab === "completed") {
      return (
        typedOrders &&
        typedOrders.filter((item) => {
          return item.status === "prepared";
        })
      );
    } else if (
      tab === "completed" &&
      orderType !== "deliver" &&
      orderType !== "online"
    ) {
      return (
        typedOrders &&
        typedOrders.filter((item) => {
          return (
            item.status === "prepared" && item.payment_status === "success"
          );
        })
      );
    }
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
      {orderType === "online" ? (
        <TabPane tab="Deliver" key="1">
          <OrderView
            clickOK={clickOK}
            tab={"online"}
            getCategoriesOrders={getCategoriesOrders}
            handleDelete={handleDelete}
          />
        </TabPane>
      ) : (
        <TabPane tab="Placed Orders" key="1">
          <OrderView
            clickOK={clickOK}
            tab={"placed"}
            getCategoriesOrders={getCategoriesOrders}
            handleDelete={handleDelete}
          />
        </TabPane>
      )}
      {orderType === "online" ? (
        <TabPane tab="Take Away" key="2">
          <OrderView
            clickOK={clickOK}
            tab={"take_away"}
            getCategoriesOrders={getCategoriesOrders}
            handleDelete={handleDelete}
          />
        </TabPane>
      ) : (
        <TabPane tab="Prepared Orders" key="2">
          <OrderView
            clickOK={clickOK}
            tab={"prepared"}
            getCategoriesOrders={getCategoriesOrders}
            handleDelete={handleDelete}
          />
        </TabPane>
      )}
      {orderType !== "online" && (
        <TabPane tab="Draft Orders" key="draft">
          <OrderView
            clickOK={clickOK}
            tab={"draft"}
            getCategoriesOrders={getCategoriesOrders}
            handleDelete={handleDelete}
          />
        </TabPane>
      )}

      <TabPane tab="Completed Orders" key="completed">
        <OrderView
          clickOK={clickOK}
          tab={"completed"}
          getCategoriesOrders={getCategoriesOrders}
          handleDelete={handleDelete}
        />
      </TabPane>
    </TabsCustom>
  );
};
