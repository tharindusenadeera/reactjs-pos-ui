import React from "react";
import { Radio } from "antd";

export const RadioCustom = (props) => {
  const [value, setValue] = React.useState(1);

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  return (
    <Radio.Group onChange={onChange} value={value}>
      {props.children}
    </Radio.Group>
  );
};
