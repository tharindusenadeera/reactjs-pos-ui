import React from "react";
import { InputCustom } from "../input";
import { Label } from "./Label";
import { Error } from "./Error";

/* Props

label = string (Label title)
plusComp = plus button modal component
className = string (Custom class)


placeholder = String (Placeholder text)
errorMsg = String {Error message}

*/

export const InputField = (props) => {
  const {
    label,
    plusComp,
    placeholder,
    value,
    disabled,
    errorMsg,
    type,
    onChange,
    step,
    onKeyDown
  } = props;
  return (
    <div className="field-row">
      {label ? <Label label={label} plusComp={plusComp} /> : ""}
      <InputCustom
        type={type}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={onChange}
        step={step}
        onKeyDown={onKeyDown}
      />
      <Error errorMsg={errorMsg} />
    </div>
  );
};
