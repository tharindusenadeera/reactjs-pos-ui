import React from "react";
import { ModalCustom } from "../modal";
import Theme from "../../utils/Theme";

export const EditButton = (props) => {
  const { title, children, btnClass, type } = props;
  return (
    <ModalCustom
      btnTitle={Theme.icons.$edit}
      btnClass={btnClass}
      title={title}
      type={type}
    >
      {children}
    </ModalCustom>
  );
};
