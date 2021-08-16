import React, { useRef } from "react";
import { ButtonCustom } from ".";
import Theme from "../../utils/Theme";

export const PdfButton = (props) => {
  const { disabled, onClick, record, width} = props;
  const Title = useRef("");

  Title.current = Theme.icons.$pdf;

  return (
    <ButtonCustom
    type="primary"
    width={width}
    btnTitle={Title.current}
    onClick={() =>  onClick(record)}
    disabled={disabled}
    />
  );
};
