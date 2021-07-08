import React from "react";
import { Button } from "antd";
import styled from "styled-components";
import Theme from "../../utils/Theme";

const ButtonAnt = styled(Button)`
  &.ant-btn-primary {
    background: ${Theme.colors.$primary};
    border-color: ${Theme.colors.$primary};
    &:hover,
    :focus {
      background: ${Theme.colors.$primaryHover};
      border-color: ${Theme.colors.$primaryHover};
    }
  }

  &.ant-btn-secondary {
    background: ${Theme.colors.$white};
    border: 1.8px solid transparent;
    border-color: ${Theme.colors.$primary};
    color: ${Theme.colors.$primary};
    &:hover,
    :focus {
      background: ${Theme.colors.$primaryLight};
      border-color: ${Theme.colors.$primaryHover};
      color: ${Theme.colors.$primaryHover};
    }
  }
`;

export const ButtonCustom = (props) => {
  return (
    <ButtonAnt
      type={props.type}
      onClick={props.onClick}
      className={props.className}
    >
      {props.btnTitle}
    </ButtonAnt>
  );
};
