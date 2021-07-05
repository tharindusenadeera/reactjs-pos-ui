import React from "react";
import { Popover, Button } from "antd";

const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);

export const PopoverCustom = () => {
  return (
    <Popover content={content} trigger="click">
      <Button>Click me</Button>
    </Popover>
  );
};
