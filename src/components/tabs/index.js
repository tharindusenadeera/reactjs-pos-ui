import React from "react";
import { Tabs } from "antd";
import styled from "styled-components";
import Theme from "../../utils/Theme";

const TabAnt = styled(Tabs)`
  &.ant-tabs {
    color: ${Theme.colors.$grey};
    .ant-tabs-tab {
      border-radius: ${Theme.space.BorderRadius} ${Theme.space.BorderRadius} 0 0 !important;
      &.ant-tabs-tab-active {
        background: ${Theme.colors.$primary};
        .ant-tabs-tab-btn {
          color: ${Theme.colors.$white};
        }
      }
      &:hover {
        color: ${Theme.colors.$primaryHover};
      }
    }
  }
`;


export const TabsCustom = (props) => {
  const {tabCallback} = props;

  const callback = (key) => {
    // console.log(key);
    if (tabCallback instanceof Function){
      tabCallback(key);
    }
  }

  return (
    <TabAnt defaultActiveKey="1" onChange={callback} type="card">
      {props.children}
    </TabAnt>
  );
};

/* Sample Code

  const { TabPane } = Tabs;
  
  <TabsCustom>
   <TabPane tab="Tab 1" key="1">
      Content of Tab Pane 1
    </TabPane>
    <TabPane tab="Tab 2" key="2">
      Content of Tab Pane 2
    </TabPane>
    <TabPane tab="Tab 3" key="3">
      Content of Tab Pane 3
    </TabPane> 
  <TabsCustom>
  */
