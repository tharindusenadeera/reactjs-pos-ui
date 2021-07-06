import React from "react";
import { Select } from "antd";
import styled from "styled-components";
import Theme from "../../utils/Theme";

/* Props

showSearch = bpplean (Search option enable or disable)
placeholder = string (Placeholder text)

*/

const SelectAnt = styled(Select)`
  &.ant-select {
    width: 100%;
  }
  &.ant-select:not(.ant-select-customize-input) .ant-select-selector {
    border-radius: ${Theme.space.BorderRadius};
    background-color: ${Theme.colors.$background};
  }
  &.ant-select:not(.ant-select-disabled):hover .ant-select-selector {
    border-color: ${Theme.colors.$primary};
    box-shadow: ${Theme.colors.$primaryShadow};
  }
  &.ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input)
    .ant-select-selector {
    border-color: ${Theme.colors.$primary};
    box-shadow: ${Theme.colors.$primaryShadow};
  }
`;

export const SelectCustom = (props) => {
  const { Option } = Select;

  function onChange(value) {
    console.log(`selected ${value}`);
  }

  function onBlur() {
    console.log("blur");
  }

  function onFocus() {
    console.log("focus");
  }

  function onSearch(val) {
    console.log("search:", val);
  }

  return (
    <SelectAnt
      showSearch={props.showSearch}
      placeholder={props.placeholder}
      optionFilterProp="children"
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      onSearch={onSearch}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      <Option value="jack">Jack</Option>
      <Option value="lucy">Lucy</Option>
      <Option value="tom">Tom</Option>
    </SelectAnt>
  );
};
