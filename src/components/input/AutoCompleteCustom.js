import React, { useRef } from "react";
import { AutoComplete } from "antd";
import styled from "styled-components";
import Theme from "../../utils/Theme";

const AutoCompleteAnt = styled(AutoComplete)`
  &.ant-select {
    width: 100%;

    &:not(.ant-select-customize-input) .ant-select-selector {
      background-color: ${Theme.colors.$background};
    }

    &:not(.ant-select-disabled):hover .ant-select-selector {
      border-color: ${Theme.colors.$primary};
    }

    &.ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input)
      .ant-select-selector {
      box-shadow: ${Theme.colors.$primaryShadow};
    }
  }
`;

export const AutoCompleteCustom = (props) => {
  const { placeholder, value, disabled, options, onSelect, onSearch } = props;

  return (
    <AutoCompleteAnt
      placeholder={placeholder}
      value={value}
      allowClear
      onSelect={onSelect}
      onSearch={onSearch}
      disabled={disabled}
      options={options}
    />
  );
};
