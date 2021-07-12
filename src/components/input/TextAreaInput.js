import React from "react";
import { Input } from "antd";
import styled from "styled-components";
import Theme from "../../utils/Theme";

const Wrapper = styled.div`
  .ant-input-affix-wrapper {
    background-color: ${Theme.colors.$background};
    textarea.ant-input {
      background-color: ${Theme.colors.$background};
      border-radius: ${Theme.space.BorderRadius};
    }
    .ant-input-clear-icon {
      color: ${Theme.colors.$grey};
    }
  }
  .ant-input:hover,
  .ant-input-affix-wrapper:not(.ant-input-affix-wrapper-disabled):hover {
    border-color: ${Theme.colors.$primary};
  }
  .ant-input-affix-wrapper:focus,
  .ant-input-affix-wrapper-focused,
  .ant-input:focus,
  .ant-input-focused {
    border-color: ${Theme.colors.$primary};
    box-shadow: ${Theme.colors.$primaryShadow};
  }
`;

export const TextAreaInput = (props) => {
  const { TextArea } = Input;

  const onChange = (e) => {
    console.log(e);
  };

  return (
    <Wrapper>
      <TextArea
        placeholder={props.placeholder}
        allowClear
        onChange={onChange}
      />
    </Wrapper>
  );
};
