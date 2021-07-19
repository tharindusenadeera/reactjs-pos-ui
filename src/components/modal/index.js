import React, { Fragment, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Modal } from "antd";
import { ButtonCustom } from "../button";
import styled from "styled-components";
import Theme from "../../utils/Theme";
import { addCustomerTriggered } from "../../actions/customer";

/* Props

count = Intiger (Show count as label top of the button)

title = Model Title
okText = String (Modal Submit button text)
cancelText = String (Modal Cancel button Text)

*/

const ButtonWrap = styled.div`
  position: relative;
`;

const ModalAnt = styled(Modal)`
  top: 50px;

  .ant-modal-header {
    .ant-modal-title {
      font-size: 1.125rem;
      font-weight: 600;
    }
  }

  .ant-modal-body {
    max-height: 67vh;
    overflow: scroll;
    overflow-x: hidden;
    padding: 20px;

    &::-webkit-scrollbar {
      width: 5px;
    }
    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
    }
    &::-webkit-scrollbar-thumb {
      background-color: ${Theme.colors.$greyd3d7dc};
      //outline: 1px solid ${Theme.colors.$greye9ecef};
    }
  }

  .ant-modal-footer {
    display: flex;
    justify-content: center;

    @media ${Theme.device.xs} {
      flex-direction: column-reverse;

      .ant-btn:last-child {
        margin-bottom: 15px;
      }
    }
  }

  &.body-nonpadding {
    .ant-modal-body {
      padding: 0;
    }
  }
`;

const Count = styled.span`
  position: absolute;
  z-index: 1;
  top: -10px;
  right: -5px;
  background-color: ${Theme.colors.$danger};
  color: ${Theme.colors.$white};
  font-size: 11px;
  font-weight: 500;
  padding: 1px 5px;
  border-radius: 25px;
`;

export const ModalCustom = (props) => {
  const dispatch = useDispatch();
  const {
    count,
    type,
    okText,
    cancelText,
    btnTitle,
    btnClass,
    title,
    className,
    children,
    clickOk,
    clickCancel,
  } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    clickOk();
    dispatch(addCustomerTriggered(true));
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    clickCancel();
    dispatch(addCustomerTriggered(false));
  };

  /* Prop Handle */
  const CountComp = useRef("");
  const PrimaryButtonText = useRef("");
  const SecondaryButtonText = useRef("");
  if (!!count) {
    CountComp.current = <Count>{count}</Count>;
  }

  if (!okText) {
    PrimaryButtonText.current = "Submit";
  } else {
    PrimaryButtonText.current = okText;
  }

  if (!cancelText) {
    SecondaryButtonText.current = "Cancel";
  } else {
    SecondaryButtonText.current = cancelText;
  }

  return (
    <Fragment>
      <ButtonWrap>
        <ButtonCustom
          type={type}
          btnTitle={btnTitle}
          onClick={showModal}
          className={btnClass}
        />
        {CountComp.current}
      </ButtonWrap>

      <ModalAnt
        title={title}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
        okText={PrimaryButtonText.current}
        cancelText={SecondaryButtonText.current}
        className={className}
      >
        {children}
      </ModalAnt>
    </Fragment>
  );
};
