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
  const {onClickPlus, onClickMinus,onChange, value, defaultValue} = props;
  // console.log(value)
  // console.log(defaultValue)
   return (
    <Wrapper>
      <ButtonWrap>
        <ButtonCustom btnTitle={Theme.icons.$minus} type="primary" onClick={onClickMinus}/>
      </ButtonWrap>
      <InputAnt formatter="number" defaultValue={defaultValue} value={value} onChange={(e) => onChange(e.target.value)}/>
      <ButtonWrap>
        <ButtonCustom btnTitle={Theme.icons.$plus} type="primary" onClick={onClickPlus}/>
      </ButtonWrap>
    </Wrapper>
  );
};
