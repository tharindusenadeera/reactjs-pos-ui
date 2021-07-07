import React from "react";
import { InputNumber } from "antd";
import styled from "styled-components";
import Theme from "../../utils/Theme";

const InputAnt = styled(InputNumber)`
  &.ant-input-number {
    background-color: ${Theme.colors.$background};
    input.ant-input {
      background-color: ${Theme.colors.$background};
    }
  }
  &.ant-input-number:not(.ant-input-number-disabled):hover {
    border-color: ${Theme.colors.$primary};
  }
  &.ant-input-number:focus,
  &.ant-input-number-focused {
    border-color: ${Theme.colors.$primary};
    box-shadow: ${Theme.colors.$primaryShadow};
  }
`;

export const InputNumberCustom = (props) => {
  function onChange(value) {
    console.log("changed", value);
  }
  return (
    <InputAnt
      placeholder="input with clear icon"
      min={props.min}
      max={props.max}
      defaultValue={props.defaultValue}
      onChange={onChange}
    />
  );
};
