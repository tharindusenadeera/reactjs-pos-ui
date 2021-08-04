import React, { Fragment, useRef } from "react";
import styled from "styled-components";
import { SelectCustom } from "../select";
import { InputCustom } from "../input";
import Theme from "../../utils/Theme";
import { Label } from "./Label";

/* Props

plusComp = plus button modal component

*/

const InputWrap = styled.div`
  display: flex;

  .ant-select {
    width: 30%;
  }

  .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    border-radius: ${Theme.space.BorderRadius} 0 0 ${Theme.space.BorderRadius};
  }
  .ant-input-affix-wrapper {
    border-radius: 0 ${Theme.space.BorderRadius} ${Theme.space.BorderRadius} 0 !important;
    border-left: 0;
  }
`;

export const SelectNInputField = (props) => {
  return (
    <Fragment>
      <Label label={props.label} plusComp={props.plusComp} />

      <InputWrap>
        <SelectCustom
          showSearch={false}
          placeholder={props.Selectplaceholder}
        />
        <InputCustom />
      </InputWrap>
    </Fragment>
  );
};
