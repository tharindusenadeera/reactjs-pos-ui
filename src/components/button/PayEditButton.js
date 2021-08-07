import React from "react";
import { ButtonCustom } from "../button";
import Theme from "../../utils/Theme";

export const PayEditButton = (props) => {
  const { type, btnClass, disabled, onClick } = props;

  return (
      <ButtonCustom
        type={type}
        btnTitle={Theme.icons.$edit}
        className={btnClass}
        disabled={disabled}
        onClick={onClick}
      />
  );
};
