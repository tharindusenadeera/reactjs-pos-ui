import React from "react";
import { Input } from "antd";

import { ButtonCustom } from "../button";
import styled from "styled-components";
import Theme from "../../utils/Theme";

const ButtonWrap = styled.div`
  .ant-btn {
    border-radius: 50%;
    padding: 0px 1px;
    margin-left: 8px;
  }
`;

const InputAnt = styled(Input)`
  &.ant-input {
    background-color: ${Theme.colors.$background};
    input.ant {
      background-color: ${Theme.colors.$background};
    }
  }
  &.ant-input:not(.ant-input-disabled):hover {
    border-color: ${Theme.colors.$primary};
  }
  &.ant-input:focus,
  &.ant-input-focused {
    border-color: ${Theme.colors.$primary};
    box-shadow: ${Theme.colors.$primaryShadow};
  }
`;

export const InputNumberCustom = (props) => {
  function onChange(value) {
    console.log("changed", value);
  }
  return (
    <div className="d-flex align-items-center">
      <ButtonWrap>
        <ButtonCustom btnTitle={Theme.icons.$plus} type="primary" />
      </ButtonWrap>
      <InputAnt defaultValue={0} formatter="number" />
      <ButtonWrap>
        <ButtonCustom btnTitle={Theme.icons.$plus} type="primary" />
      </ButtonWrap>
    </div>
  );
};
