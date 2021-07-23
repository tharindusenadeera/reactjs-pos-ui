import React, { useRef } from "react";
import { Popconfirm, message } from "antd";
import { ButtonCustom } from "../button";
import Theme from "../../utils/Theme";

export const DeleteButton = (props) => {
  const { confirm, cancel, btnTitle, disabled } = props;

  const Title = useRef("");
  if (!!btnTitle) {
    Title.current = btnTitle;
  } else {
    Title.current = Theme.icons.$delete;
  }

  return (
    <Popconfirm
      title="Are you sure to delete this record?"
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
