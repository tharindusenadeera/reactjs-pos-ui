import React, { useRef } from "react";
import { AutoComplete  } from "antd";
import styled from "styled-components";
import Theme from "../../utils/Theme";

const AutoCompleteAnt = styled(AutoComplete)`
  &.ant-input-affix-wrapper {
    background-color: ${Theme.colors.$background};
    input.ant-input {
      background-color: ${Theme.colors.$background};
    }
    .ant-input-clear-icon {
      color: ${Theme.colors.$grey};
    }
  }
  &.ant-input-affix-wrapper:not(.ant-input-affix-wrapper-disabled):hover {
    border-color: ${Theme.colors.$primary};
  }
  &.ant-input-affix-wrapper:focus,
  &.ant-input-affix-wrapper-focused {
    border-color: ${Theme.colors.$primary};
    box-shadow: ${Theme.colors.$primaryShadow};
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