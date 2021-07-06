import React, { Fragment, useState, useRef } from "react";
import { Modal } from "antd";
import { ButtonCustom } from "../button";
import styled from "styled-components";
import Theme from "../../utils/Theme";

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

  const CountComp = useRef("");
  if (!!props.count) {
    CountComp.current = <Count>{props.count}</Count>;
  }

  return (
    <Fragment>
      <ButtonWrap>
        <ButtonCustom
          type="primary"
          btnTitle={props.btnTitle}
          onClick={showModal}
          className={props.btnClass}
        />
        {CountComp.current}
      </ButtonWrap>

      <ModalAnt
        title={props.title}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
      >
        {props.children}
      </ModalAnt>
    </Fragment>
  );
};
