import React from "react";
import { Input } from "antd";

import { ButtonCustom } from "../button";
import styled from "styled-components";
import Theme from "../../utils/Theme";

const Wrapper = styled.div`
  max-width: 150px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ButtonWrap = styled.div`
  .ant-btn {
    border-radius: 50%;
    padding: 6px 7px;
  }
`;

const InputAnt = styled(Input)`
  &.ant-input {
    background-color: ${Theme.colors.$background};
    width: 65px;
    margin: 0 10px;
    text-align: center;
    border-radius: ${Theme.space.BorderRadius};
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
    <Wrapper>
      <ButtonWrap>
        <ButtonCustom btnTitle={Theme.icons.$minus} type="primary" />
      </ButtonWrap>
      <InputAnt defaultValue={props.defaultValue} formatter="number" />
      <ButtonWrap>
        <ButtonCustom btnTitle={Theme.icons.$plus} type="primary" />
      </ButtonWrap>
    </Wrapper>
  );
};
