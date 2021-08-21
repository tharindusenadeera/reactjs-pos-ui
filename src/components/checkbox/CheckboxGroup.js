import React from "react";
import { Checkbox } from "antd";
import styled from "styled-components";
import Theme from "../../utils/Theme";

const Wrapper = styled.div`
  .ant-checkbox-group {
    .ant-checkbox-wrapper {
      margin-bottom: 5px;
      .ant-checkbox {
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

      span {
        font-weight: 400;
      }
    }
  }
`;

export const CheckboxGroup = (props) => {
  return (
    <Wrapper>
      <Checkbox.Group
        options={props.options}
        defaultValue={props.defaultValue}
      />
    </Wrapper>
  );
};
