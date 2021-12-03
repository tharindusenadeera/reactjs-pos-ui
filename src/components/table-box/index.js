import React, { useState } from "react";
import { Tabs } from "antd";
import Theme from "../../utils/Theme";
import { indoorTables, outdoorTables } from "../../constants/Tables";
import { TabsCustom } from "../tabs";

const { TabPane } = Tabs;

export default function TableBox({ changeTable, value }) {
  const [typeTab, setTypeTab] = useState("indoor_tables");
  const [itemClicked, setItemClicked] = useState(null);
  function onChange(table) {
    changeTable(table);
  }

  const typeCallback = (tab) => {
    setTypeTab(tab);
  };

  const columnCount = 5;
  function createColumn(tables) {
    const table = [];
    for (let i = 0; i < tables.length; i += columnCount) {
      table.push(
        <div style={{ display: "-webkit-inline-box" }}>
          {tables.slice(i, i + columnCount).map((item) => {
            return (
              <div
                onClick={() => {
                  setItemClicked(item);
                  onChange(item);
                }}
                key={item.key}
                style={{
                  width: "150px",
                  borderRadius: "10px",
                  marginBottom: "5px",
                  marginRight: "5px",
                  cursor: "pointer",
                  backgroundColor:
                    itemClicked === item && !item.free
                      ? Theme.colors.$green
                      : "#fff",

                  textAlign: "center",
                  padding: "5px",
                  border: "2px solid " + Theme.colors.$black,
                  color: itemClicked === item ? "#fff" : "#000",
                }}
              >
                {item.value}
              </div>
            );
          })}
        </div>
      );
    }
    return table;
  }
  return (
    <TabsCustom tabCallback={typeCallback}>
      <TabPane tab="Indoor Tables" key="indoor_tables">
        <div
          style={{
            height: "400px",
            overflowY: "scroll",
          }}
        >
          {createColumn(indoorTables)}
        </div>
      </TabPane>
      <TabPane tab="Outdoor Tables" key="outdoor_tables">
        <div
          style={{
            height: "400px",
            overflowY: "scroll",
          }}
        >
          {createColumn(outdoorTables)}
        </div>
      </TabPane>
    </TabsCustom>
  );
}
