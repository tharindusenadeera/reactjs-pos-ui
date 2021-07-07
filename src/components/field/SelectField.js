import React, { Fragment, useRef } from "react";
import { SelectCustom } from "../select/index";
import styled from "styled-components";
import { ModalCustom } from "../modal/index";
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

export const SelectField = (props) => {
  const { label, showSearch, placeholder, options, plusComp } = props;
  const ModalStat = useRef("");
  const ModalComponent = useRef("");
  const ModalTitle = useRef("");
  if (plusComp === "customer-create") {
    ModalComponent.current = <CustomerCreateForm />;
    ModalTitle.current = "Add a customer";
  } else if (plusComp === "shipping-create") {
    ModalComponent.current = <ShippingCreateForm />;
    ModalTitle.current = "Add a shipping address";
  }

  if (!!plusComp) {
    ModalStat.current = (
      <ModalCustom btnTitle={Theme.icons.$plus} title={ModalTitle.current}>
        {ModalComponent.current}
      </ModalCustom>
    );
  }

  return (
    <Fragment>
      <LabelWrap>
        <label>{label}</label>
        {ModalStat.current}
      </LabelWrap>
      <SelectCustom
        showSearch={showSearch}
        placeholder={placeholder}
        options={options}
      />
    </Fragment>
  );
};
