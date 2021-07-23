import React, { useRef } from "react";
import { Popconfirm } from "antd";
import { ButtonCustom } from "../button";
import Theme from "../../utils/Theme";

export const DeleteButton = (props) => {
  const { confirm, cancel, btnTitle, confirmTitle, disabled } = props;

  const Title = useRef("");
  if (!!btnTitle) {
    Title.current = btnTitle;
  } else {
    Title.current = Theme.icons.$delete;
  }

  const GetConfirmTitle = () => {
    return confirmTitle ? confirmTitle : "Are you sure to delete this record?"
  }

  return (
    <Popconfirm
      title={GetConfirmTitle}
      onConfirm={confirm}
      onCancel={cancel}
      okText="Yes"
      cancelText="No"
    >
      <ButtonCustom
        //type="primary"
        btnTitle={Title.current}
        className="btn-danger"
        disabled={disabled}
      />
    </Popconfirm>
  );
};
