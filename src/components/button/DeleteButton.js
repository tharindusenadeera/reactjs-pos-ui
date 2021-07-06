import React from "react";
import { Popconfirm, message } from "antd";
import { ButtonCustom } from "../button";
import Theme from "../../utils/Theme";

export const DeleteButton = (props) => {
  function confirm(e) {
    console.log(e);
    message.success("Record has been deleted");
  }

  function cancel(e) {
    console.log(e);
    message.error("Delete operation canceld");
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
        btnTitle={Theme.icons.$delete}
        className="btn-danger"
      />
    </Popconfirm>
  );
};
