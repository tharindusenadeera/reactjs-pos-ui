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
  const { showSearch, placeholder, onChange, onBlur, onFocus, onSearch, options, value } = props;
  const { Option } = Select;

  return (
    <SelectAnt
      value={value}
      showSearch={showSearch}
      placeholder={placeholder}
      optionFilterProp="children"
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      onSearch={onSearch}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {options && options.map((item, key) => {
        return (
          <Option key={key} value={item.key}>{item.value}</Option>
        )
      })}
    </SelectAnt>
  );
};
