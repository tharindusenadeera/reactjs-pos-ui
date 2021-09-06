import React, { useRef } from "react";
import { Input } from "antd";
import styled from "styled-components";
import Theme from "../../utils/Theme";

const InputAnt = styled(Input)`
  &.ant-input-affix-wrapper {
    background-color: ${Theme.colors.$background};
    border-radius: ${Theme.space.BorderRadius};
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

export const InputCustom = (props) => {
  const { placeholder, value, disabled, type, onChange, step, onKeyDown } =
    props;

  const DisableState = useRef("");
  if (disabled === true) {
    DisableState.current = "disabled";
  } else {
    DisableState.current = "";
  }

  return (
    <InputAnt
      type={type}
      placeholder={placeholder}
      value={value}
      allowClear
      onChange={(e) => onChange(e)}
      disabled={DisableState.current}
      step={step}
      onKeyDown={onKeyDown}
    />
  );
};
