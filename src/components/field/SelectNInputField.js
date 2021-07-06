import React, { Fragment, useRef } from "react";
import styled from "styled-components";
import { SelectCustom } from "../select";
import { ModalCustom } from "../modal";
import { InputCustom } from "../input";
import Theme from "../../utils/Theme";
import { CustomerCreateForm } from "../../sections/customer/CustomerCreateForm";
import { ShippingCreateForm } from "../../sections/shipping/ShippingCreateForm";

/* Props

plusComp = plus button modal component

*/

const LabelWrap = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  height: 24px;

  label {
    margin-bottom: unset;
  }

  .ant-btn {
    border-radius: 50%;
    padding: 0px 1px;
    margin-left: 8px;
  }
`;

const InputWrap = styled.div`
  display: flex;

  .ant-select {
    width: 30%;
  }

  .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    border-radius: ${Theme.space.BorderRadius} 0 0 ${Theme.space.BorderRadius};
  }
  .ant-input-affix-wrapper {
    border-radius: 0 ${Theme.space.BorderRadius} ${Theme.space.BorderRadius} 0;
    border-left: 0;
  }
`;

export const SelectNInputField = (props) => {
  const ModalStat = useRef("");
  const ModalComponent = useRef("");
  const ModalTitle = useRef("");
  if (props.plusComp === "customer-create") {
    ModalComponent.current = <CustomerCreateForm />;
    ModalTitle.current = "Add a customer";
  } else if (props.plusComp === "shipping-create") {
    ModalComponent.current = <ShippingCreateForm />;
    ModalTitle.current = "Add a shipping address";
  }

  if (!!props.plusComp) {
    ModalStat.current = (
      <ModalCustom btnTitle={Theme.icons.$plus} title={ModalTitle.current}>
        {ModalComponent.current}
      </ModalCustom>
    );
  }

  return (
    <Fragment>
      <LabelWrap>
        <label>{props.label}</label>
        {ModalStat.current}
      </LabelWrap>

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
