import React from "react";
import { Popconfirm, message } from "antd";
import { ButtonCustom } from "../button";
import Theme from "../../utils/Theme";

export const DeleteButton = (props) => {
  const { confirm, cancel } = props;

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
        btnTitle={Theme.icons.$delete}
        className="btn-danger"
      />
    </Popconfirm>
  );
};
