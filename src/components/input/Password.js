import React, { useRef } from "react";
import { Input } from "antd";
import styled from "styled-components";
import Theme from "../../utils/Theme";

const Wrapper = styled.div`
  .ant-input-affix-wrapper {
    background-color: ${Theme.colors.$background};
    input.ant-input {
      background-color: ${Theme.colors.$background};
    }
    .ant-input-clear-icon {
      color: ${Theme.colors.$grey};
    }
  }
  .ant-input-affix-wrapper:not(.ant-input-affix-wrapper-disabled):hover {
    border-color: ${Theme.colors.$primary};
  }
  .ant-input-affix-wrapper:focus,
  .ant-input-affix-wrapper-focused {
    border-color: ${Theme.colors.$primary};
    box-shadow: ${Theme.colors.$primaryShadow};
  }
`;

export const PasswordCustom = (props) => {
  const { placeholder, value, disabled, onChange } = props;
  const DisableState = useRef("");
  if (disabled === true) {
    DisableState.current = "disabled";
  } else {
    DisableState.current = "";
  }

  return (
    <Wrapper>
      <Input.Password
        placeholder={placeholder}
        value={value}
        allowClear
        onChange={onChange}
        disabled={DisableState.current}
      />
    </Wrapper>
  );
};
