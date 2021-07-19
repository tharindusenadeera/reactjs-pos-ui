import React, { useRef } from "react";
import styled from "styled-components";
import Theme from "../../utils/Theme";
import { ModalCustom } from "../modal";

import { CustomerCreateForm } from "../../sections/customer/CustomerCreateForm";
import { ShippingCreateForm } from "../../sections/shipping/ShippingCreateForm";
import { DiscountForm } from "../../sections/billing/DiscountForm";
import { ShippingCost } from "../../sections/billing/ShippingCost";

/* Props

label = string (Label title)
plusComp = plus button modal component
className = string (Custom class)

*/

const LabelWrap = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  height: 24px;

  label {
    margin-bottom: unset;
    color: ${Theme.colors.$darkGrey};
  }

  .ant-btn {
    border-radius: 50%;
    padding: 0px 1px;
    margin-left: 8px;
  }
`;

export const Label = (props) => {
  const { plusComp, okText, cancelText, className, label, clickOk, clickCancel, onChange } = props;

  const ModalStat = useRef("");
  const ModalComponent = useRef("");
  const ModalTitle = useRef("");

  if (plusComp === "customer-create") {
    ModalComponent.current = <CustomerCreateForm />;
    ModalTitle.current = "Add a customer";
  } else if (plusComp === "shipping-create") {
    ModalComponent.current = <ShippingCreateForm />;
    ModalTitle.current = "Add a shipping address";
  } else if (plusComp === "discount") {
    ModalComponent.current = <DiscountForm onChange={onChange}/>;
    ModalTitle.current = "Add Discount";
  } else if (plusComp === "shipping-cost") {
    ModalComponent.current = <ShippingCost />;
    ModalTitle.current = "Add Shipping Cost";
  }

  if (!!plusComp) {
    ModalStat.current = (
      <ModalCustom
        btnTitle={Theme.icons.$plus}
        title={ModalTitle.current}
        type="primary"
        okText={okText}
        cancelText={cancelText}
        clickOk={clickOk}
        clickCancel={clickCancel}
      >
        {ModalComponent.current}
      </ModalCustom>
    );
  }

  return (
    <LabelWrap className={className}>
      <label>{label}</label>
      {ModalStat.current}
    </LabelWrap>
  );
};
