import React, { Fragment, useState, useRef } from "react";
import { Modal } from "antd";
import { Button } from "antd";
import styled from "styled-components";
import Theme from "../../utils/Theme";

/*Props

className = "body-nonpadding" (Remove modal body padding)
*/

const ContentWrap = styled.div`
  position: relative;
`;

const ButtonAnt = styled(Button)`
  &.ant-btn,
  .ant-btn-ghost {
    padding: unset;
    border-radius: unset;
    border: unset;
    border-color: ${Theme.colors.$primaryHover};
    background: unset;
    box-shadow: unset;
  }
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

export const ContentModal = (props) => {
  const { clickOk, clickCancel, disableOk, disableCancel, record, selectItem} = props;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    selectItem(record);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    clickOk();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    clickCancel();
    setIsModalVisible(false);
  };

  /* Prop Handle */
  const CountComp = useRef("");
  const PrimaryButtonText = useRef("");
  const SecondaryButtonText = useRef("");
  if (!!props.count) {
    CountComp.current = <Count>{props.count}</Count>;
  }

  if (!props.okText) {
    PrimaryButtonText.current = "Submit";
  } else {
    PrimaryButtonText.current = props.okText;
  }

  if (!props.cancelText) {
    SecondaryButtonText.current = "Cancel";
  } else {
    SecondaryButtonText.current = props.cancelText;
  }

  return (
    <Fragment>
      <ContentWrap>
        <ButtonAnt type="ghost" onClick={showModal}>
          {props.btnContent}
        </ButtonAnt>
      </ContentWrap>

      <ModalAnt
        title={props.title}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
        okText={PrimaryButtonText.current}
        cancelText={SecondaryButtonText.current}
        className={props.className}
        cancelButtonProps={{ disabled: disableCancel }}
        okButtonProps={{ disabled: disableOk }}
        okType="primary green"
      >
        {props.children}
      </ModalAnt>
    </Fragment>
  );
};
