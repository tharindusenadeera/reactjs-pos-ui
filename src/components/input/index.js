import React from "react";
import { Input } from "antd";
import styled from "styled-components";
import Theme from "../../utils/Theme";

const InputAnt = styled(Input)`
  &.ant-input-affix-wrapper {
    background-color: ${Theme.colors.$background};
    input.ant-input {
      background-color: ${Theme.colors.$background};
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

export const InputCustom = () => {
  const onChange = (e) => {
    console.log(e);
  };
  return (
    <InputAnt
      placeholder="input with clear icon"
      allowClear
      onChange={onChange}
    />
  );
};
