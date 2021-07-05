import React from "react";
import { Popover, Button } from "antd";

export const PopoverCustom = (props) => {
  const content = <div>{props.children}</div>;

  return (
    <Popover content={content} trigger="click">
      <Button type="primary">{props.btnTitle}</Button>
    </Popover>
  );
};
