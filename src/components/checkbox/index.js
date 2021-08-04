import React from "react";
import { Checkbox } from "antd";
import styled from "styled-components";
import Theme from "../../utils/Theme";

const CheckboxAnt = styled(Checkbox)`
  &.ant-checkbox-wrapper {
    display: flex;
    align-items: center;
    .ant-checkbox {
      & + span {
        padding-top: 6px;
      }

      .ant-checkbox-inner {
        width: 24px;
        height: 24px;
        border-radius: ${Theme.space.BorderRadius};

        &::after {
          width: 6px;
          height: 12px;
          top: 48%;
          left: 25%;
        }
      }

      &.ant-checkbox-checked {
        .ant-checkbox-inner {
          background-color: ${Theme.colors.$primary};
          border-color: ${Theme.colors.$primary};
        }

        &::after {
          border: 1px solid ${Theme.colors.$secondary};
        }
      }
    }

    &:hover .ant-checkbox-inner,
    .ant-checkbox:hover .ant-checkbox-inner,
    .ant-checkbox-input:focus + .ant-checkbox-inner {
      border-color: ${Theme.colors.$primaryHover} !important;
    }
  }
`;

export const CheckboxCustom = (props) => {
  return <CheckboxAnt onChange={props.onChange}>{props.children}</CheckboxAnt>;
};
