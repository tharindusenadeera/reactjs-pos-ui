import React from "react";
import { Dropdown } from "antd";
import { ButtonCustom } from "../button";

export const DropdownCustom = (props) => {
  const menu = props.children;

  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <ButtonCustom
        type="primary"
        btnTitle={props.btnTitle}
        onClick={(e) => e.preventDefault()}
        className={props.btnClass}
      />
    </Dropdown>
  );
};

/* Sample Component Code 

import { Menu } from "antd";

<DropdownCustom
    btnTitle="Button Title Here"
    >
    <Menu>
        <Menu.Item key="0">
        <a href="https://www.antgroup.com">1st menu item</a>
        </Menu.Item>
        <Menu.Item key="1">
        <a href="https://www.aliyun.com">2nd menu item</a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3">3rd menu item</Menu.Item>
    </Menu>
</DropdownCustom>
*/
