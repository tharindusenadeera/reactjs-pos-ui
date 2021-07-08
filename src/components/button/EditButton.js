import React from "react";
import { ModalCustom } from "../modal";
import Theme from "../../utils/Theme";

export const EditButton = (props) => {
  const { title, children, btnClass } = props;
  return (
    <ModalCustom
      btnTitle={Theme.icons.$edit}
      btnClass={btnClass}
      title={title}
      type={props.type}
    >
      {children}
    </ModalCustom>
  );
};
