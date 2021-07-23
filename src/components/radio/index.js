import React from "react";
import { Radio } from "antd";
import styled from "styled-components";
import Theme from "../../utils/Theme";

const Wrapper = styled.div`
  .ant-radio-wrapper {
    margin-right: 14px;
  }

  .ant-radio-checked::after {
    border: 1px solid ${Theme.colors.$primary};
    top: 4px;
  }

  .ant-radio-inner {
    width: 26px;
    height: 26px;
    top: 4px;
    &::after {
      background-color: ${Theme.colors.$primary};
      width: 16px;
      height: 16px;
      top: 4px;
      left: 4px;
    }
  }

  .ant-radio-checked .ant-radio-inner {
    border-color: ${Theme.colors.$primary};
  }

  .ant-radio-wrapper:hover .ant-radio,
  .ant-radio:hover .ant-radio-inner,
  .ant-radio-input:focus + .ant-radio-inner {
    border-color: ${Theme.colors.$primary};
  }

  .ant-radio-input:focus + .ant-radio-inner {
    box-shadow: ${Theme.colors.$primaryShadow};
  }
`;

export const RadioCustom = (props) => {
  const { onChange, value, children } = props;
  return (
    <Wrapper>
      <Radio.Group onChange={onChange} value={value}>
        {children}
      </Radio.Group>
    </Wrapper>
  );
};
