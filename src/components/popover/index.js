import React from "react";
import { Popover } from "antd";
import { ButtonCustom } from "../button";

export const PopoverCustom = (props) => {
  const content = <div>{props.children}</div>;

  return (
    <Popover
      content={content}
      trigger="click"
      className={props.className}
      placement="bottom"
    >
      <ButtonCustom
        type="primary"
        btnTitle={props.btnTitle}
        className={props.btnClass}
      />
    </Popover>
  );
};
