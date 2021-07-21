import React, { useRef, useState } from "react";
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
  const {
    plusComp,
    okText,
    cancelText,
    className,
    label,
    hideCancel,
    hideSubmit,
    disableCancel,
    disableOk,
    onChange,
  } = props;
  const ModalStat = useRef("");
  const ModalComponent = useRef("");
  const ModalTitle = useRef("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  if (plusComp === "customer-create") {
    ModalComponent.current = <CustomerCreateForm handleCancel={handleCancel} />;
    ModalTitle.current = "Add a customer";
  } else if (plusComp === "shipping-create") {
    ModalComponent.current = <ShippingCreateForm handleCancel={handleCancel} />;
    ModalTitle.current = "Add a Delivery address";
  } else if (plusComp === "discount") {
    ModalComponent.current = <DiscountForm onChange={onChange} />;
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
        okType="primary green"
        cancelText={cancelText}
        hideCancel={hideCancel}
        hideSubmit={hideSubmit}
        disableCancel={disableCancel}
        disableOk={disableOk}
        showModal={showModal}
        isModalVisible={isModalVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
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
