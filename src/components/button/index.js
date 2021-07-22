import React from "react";
import { Button } from "antd";
import styled from "styled-components";
import Theme from "../../utils/Theme";

const ButtonAnt = styled(Button)`
  &.ant-btn-primary {
    background: ${Theme.colors.$primary};
    border-color: ${Theme.colors.$primaryBorder};
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
      color: ${Theme.colors.$primary};
    }
  }

  &.ant-btn[disabled],
  &.ant-btn[disabled]:hover,
  &.ant-btn[disabled]:focus,
  &.ant-btn[disabled]:active {
    color: rgba(0, 0, 0, 0.25);
    background: ${Theme.colors.$greye9ecef} !important;
    border-color: ${Theme.colors.$greyd3d7dc} !important;
    text-shadow: none !important;
    box-shadow: none !important;
  }
`;

export const ButtonCustom = (props) => {
  const { type, className, btnTitle, onClick, disabled } = props;
  return (
    <ButtonAnt
      type={type}
      onClick={onClick}
      className={className}
      disabled={disabled}
    >
      {btnTitle}
    </ButtonAnt>
  );
};
