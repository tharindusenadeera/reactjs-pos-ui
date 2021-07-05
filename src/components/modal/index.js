import React, { Fragment, useState } from "react";
import { Modal } from "antd";
import { ButtonCustom } from "../button";
import styled from "styled-components";
import Theme from "../../utils/Theme";

const ButtonWrap = styled.div`
  position: relative;
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
  padding: 4px 8px;
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
  return (
    <Fragment>
      <ButtonWrap>
        <ButtonCustom
          type="primary"
          btnTitle={props.btnTitle}
          onClick={showModal}
          className={props.btnClass}
        />
        <Count>5</Count>
      </ButtonWrap>

      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {props.children}
      </Modal>
    </Fragment>
  );
};
