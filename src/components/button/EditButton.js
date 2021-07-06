import React from "react";
import { ModalCustom } from "../modal";
import Theme from "../../utils/Theme";

export const EditButton = (props) => {
  return (
    <ModalCustom
      btnTitle={Theme.icons.$edit}
      btnClass={props.btnClass}
      title={props.title}
    >
      {props.children}
    </ModalCustom>
  );
};
