import React, { useRef } from "react";
import { ButtonCustom } from "../button";
import Theme from "../../utils/Theme";

export const FlushButton = (props) => {
  const { disabled, onClick} = props;
  const Title = useRef("");

  Title.current = Theme.icons.$flush;

  return (
    <ButtonCustom
    type="primary"
    btnTitle={Title.current}
    onClick={() => onClick()}
    disabled={disabled}
    tooltipText="New order"
    />
  );
};
